import requests
from dotenv import load_dotenv
import urllib.parse
from datetime import datetime
from flask import Flask, redirect, request, jsonify, session
import pandas as pd
import os
import numpy as np
from collections import Counter
from flask_cors import CORS
from analysis import get_top_tracks_df, get_top_artists_df , get_recent_plays_df


load_dotenv()
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=[
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    os.environ.get("FRONTEND_URL")
])

SPOTIFY_FEATURES = pd.read_csv("data/SpotifyFeatures.csv")

def get_features_df():
    return SPOTIFY_FEATURES

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
    return jsonify({"message": "API is running"})


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

        # store tokens in Flask session
        session['access_token'] = token_info['access_token']
        session['refresh_token'] = token_info['refresh_token']
        session['expires_at'] = datetime.now().timestamp() + token_info['expires_in']

        # redirect to frontend dashboard page
        return redirect(os.environ.get("FRONTEND_URL") + "/home")



@app.route('/refresh_token')
def refresh_token():
    refresh_token = session.get("refresh_token")
    if not refresh_token:
        return jsonify({"error": "No refresh token available"}), 401

    payload = {
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }

    response = requests.post(TOKEN_URL, data=payload)
    if response.status_code != 200:
        return jsonify({"error": "Failed to refresh token", "details": response.json()}), 500

    token_info = response.json()
    session['access_token'] = token_info['access_token']
    session['expires_at'] = datetime.now().timestamp() + token_info['expires_in']

    # after refreshing, you can either redirect to /user or just return success
    return redirect(os.environ.get("FRONTEND_URL") + "/home")



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




@app.route('/top_tracks',  methods=["GET"])
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
def analysis():

    access_token = session.get('access_token')

    if not access_token:
        return jsonify({"error": "Not authenticated"}), 401

    # Get fresh data from Spotify
    tracks_df = get_top_tracks_df(access_token)
    artists_df = get_top_artists_df(access_token)
    recent_plays_df = get_recent_plays_df(access_token)

    # Merge with SpotifyFeatures
    tracks_stats = pd.merge(
        tracks_df,
        SPOTIFY_FEATURES,
        on='Track',
        how='left'
    )

    # Plays per hour
    recent_plays_df['Played At'] = pd.to_datetime(recent_plays_df['Played At'])

    plays_per_hour = (
        recent_plays_df
        .set_index('Played At')
        .resample('h')
        .size()
    )

    plays_per_hour_dict = {
        t.strftime('%Y-%m-%d %H:%M:%S'): int(count)
        for t, count in plays_per_hour.items()
    }

    # Feature percentages
    features = [
        'Danceability',
        'Energy',
        'Speechiness',
        'Instrumentalness',
        'Valence'
    ]

    track_features = tracks_stats.groupby('Track')[features].sum()

    total_sum = np.sum(track_features.to_numpy())

    feature_percentages = (
        (track_features.sum() / total_sum) * 100
    ).round(2).to_dict()

    # Most listened artists
    most_listened_artist = (
        tracks_df.groupby('Artist')['Track']
        .count()
        .sort_values(ascending=False)
        .reset_index()
        .to_dict()
    )

    # Genre distribution
    artists_df['Genres'] = artists_df['Genres'].fillna('').apply(
        lambda x: [g.strip() for g in x.split(',')] if x else []
    )

    all_genres = [
        genre
        for sublist in artists_df['Genres']
        for genre in sublist
    ]

    genre_counts = Counter(all_genres)

    genre_distribution = [
        {"Genre": k, "Count": v}
        for k, v in genre_counts.items()
    ]

    return jsonify({
        "plays_per_hour": plays_per_hour_dict,
        "feature_percentages": feature_percentages,
        "most_listened_artist": most_listened_artist,
        "genre_distribution": genre_distribution,
    })


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=False, port=5000)

# 
