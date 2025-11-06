import requests
from dotenv import load_dotenv
import urllib.parse
from datetime import datetime
from flask import Flask, redirect, request, jsonify, session
import pandas as pd
import os
import numpy as np
from collections import Counter
from analysis import get_top_tracks_df, get_top_artists_df, get_recent_plays_df 

load_dotenv()
app = Flask(__name__)

app.secret_key = os.environ.get("SECRET_KEY")
CLIENT_ID = os.environ.get('CLIENT_ID')
CLIENT_SECRET = os.environ.get('CLIENT_SECRET')
REDIRECT_URI = os.environ.get('REDIRECT_URI')
AUTH_URL = os.environ.get('AUTH_URL')
TOKEN_URL = os.environ.get('TOKEN_URL')
API_BASE_URI = os.environ.get('API_BASE_URI')


@app.route('/')
def index():
    """
    Display the home page with a welcome message and a login link.

    Returns:
        str: HTML message with a link to initiate Spotify login.
    """
    return "Welcome to my Spotify App <a href='/login'>Login with Spotify</a>"


@app.route('/login')
def login():
    """
    Redirect user to Spotify's authorization page for OAuth 2.0 login.

    Constructs the authorization URL with required scopes and parameters,
    then redirects the user to Spotify’s login page.

    Returns:
        Response: Redirect to Spotify authorization URL.
    """
    scope = 'user-read-private user-read-email user-top-read user-read-recently-played user-library-read'
    params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'scope': scope,
        'redirect_uri': REDIRECT_URI,
        'show_dialog': True
    }
    auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"
    return redirect(auth_url)


@app.route('/callback')
def callback():
    """
    Handle the OAuth callback from Spotify after user login.

    Exchanges the authorization code for access and refresh tokens,
    and stores them in the Flask session for subsequent API calls.

    Returns:
        Response: Redirects to the '/user' route or returns an error JSON.
    """
    if 'error' in request.args:
        return jsonify({"error": request.args['error']})

    if 'code' in request.args:
        req_body = {
            'code': request.args['code'],
            'grant_type': 'authorization_code',
            'redirect_uri': REDIRECT_URI,
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET
        }
        response = requests.post(TOKEN_URL, data=req_body)
        token_info = response.json()

        session['access_token'] = token_info['access_token']
        session['refresh_token'] = token_info['refresh_token']
        session['expires_at'] = datetime.now().timestamp() + token_info['expires_in']

    return redirect('/user')


@app.route('/user')
def get_user():
    """
    Retrieve the authenticated user's Spotify profile data.

    Checks if a valid access token exists; if expired, redirects to refresh.
    Fetches the user's profile using Spotify’s 'me' endpoint.

    Returns:
        Response: JSON of user profile data or an error message.
    """
    if 'access_token' not in session:
        return redirect('/login')

    if datetime.now().timestamp() > session['expires_at']:
        return redirect('/refresh_token')

    headers = {'Authorization': f"Bearer {session['access_token']}"}
    response = requests.get(API_BASE_URI + 'me', headers=headers)

    if response.status_code != 200:
        return {'error': 'Failed to retrieve user', 'details': response.json()}, response.status_code

    return jsonify(response.json())


@app.route('/top_tracks')
def top_tracks():
    """
    Fetch and return the user's top tracks from Spotify.

    Uses the stored access token to call a helper function that retrieves
    top tracks data and returns it in JSON format.

    Returns:
        str: JSON representation of top tracks.
    """
    access_token = session.get('access_token')
    df = get_top_tracks_df(access_token)  
    return jsonify(df.to_dict(orient='records'))  


@app.route('/top_artists')
def top_artists():
    """
    Fetch and return the user's top artists from Spotify.

    Uses the stored access token to call a helper function that retrieves
    top artist data and returns it in JSON format.

    Returns:
        str: JSON representation of top artists.
    """
    access_token = session.get('access_token')
    df = get_top_artists_df(access_token)
    return jsonify(df.to_dict(orient='records'))


@app.route('/recently-played')
def recently_played():
    """
    Fetch and return the user's recently played tracks from Spotify.

    Uses the stored access token to call a helper function that retrieves
    recently played tracks and returns them in JSON format.

    Returns:
        str: JSON representation of recently played tracks.
    """
    access_token = session.get('access_token')
    df = get_recent_plays_df(access_token)
    return jsonify(df.to_dict(orient='records'))


@app.route('/analysis')
    #Load CSV data
def analysis():
        
    tracks_df = pd.read_csv("data/top_tracks.csv")
    artists_df = pd.read_csv("data/top_artists.csv")
    recent_plays_df = pd.read_csv("data/recently_played.csv")
    track_feature_df = pd.read_csv("data/SpotifyFeatures.csv")    
    
    #Merge track Featues
    tracks_stats = pd.merge(
        tracks_df,
        track_feature_df,
        on='Track',
        how='left'
    )
    
    # plays per hour
    recent_plays_df['Played At'] = pd.to_datetime(recent_plays_df['Played At'])
    plays_per_hour = recent_plays_df.set_index('Played At').resample('h').size().to_dict()
    plays_per_hour_dict = {t.strftime('%Y-%m-%d %H:%M:%S'): count for t, count in plays_per_hour.items()}
    
    # Most listened song features 
    features = ['Danceability', 'Energy', 'Speechiness', 'Instrumentalness', 'Valence']
    track_features = tracks_stats.groupby('Track')[features].sum()
    total_sum = np.sum(track_features.to_numpy())
    feature_percentages = ((track_features.sum(axis=0) / total_sum) * 100).round().to_dict()

    # Most listened artists
    most_listened_artist = (
        tracks_df.groupby('Artist')['Track']
        .count()
        .sort_values(ascending=False)
        .to_dict()
    )

    # Genre distribution
    artists_df['Genres'] = artists_df['Genres'].fillna('').apply(
        lambda x: [g.strip() for g in x.split(',')] if x else []
    )

    all_genres = [genre for sublist in artists_df['Genres'] for genre in sublist]
    genre_counts = Counter(all_genres)
    genre_df = pd.DataFrame(genre_counts.items(), columns=['Genre', 'Count']).sort_values('Count', ascending=False)
    genre_distribution = genre_df.to_dict(orient='records')

    
    # Return JSON 
    return jsonify({
        "plays_per_hour": plays_per_hour_dict,
        "feature_percentages": feature_percentages,
        "most_listened_artist": most_listened_artist,
        "genre_distribution": genre_distribution,
    })


if __name__ == '__main__':
    """
    Run the Flask application on host 0.0.0.0 with debug mode enabled.
    """
    app.run(host='0.0.0.0', debug=True) 

# 
