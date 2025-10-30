import requests
import pandas as pd
import os
from dotenv import load_dotenv
from flask import request

load_dotenv()
API_BASE_URI = os.environ.get('API_BASE_URI')

DATA_DIR = os.path.join(os.path.dirname(__file__), 'data')
os.makedirs(DATA_DIR, exist_ok=True)


def get_top_tracks_df(access_token):
    """
    Fetch the authenticated user's top tracks from the Spotify API and return as a DataFrame.
#
    Args:
        access_token (str): Spotify OAuth access token for the current user.

    Returns:
        pandas.DataFrame: DataFrame containing details of the user's top tracks, 
        including track name, artist, album, popularity, Spotify URL, and album image.

    Raises:
        Exception: If the API request fails or returns a non-200 status code.
    """
    headers = {'Authorization': f'Bearer {access_token}'}

    time_range = request.args.get('time_range', 'short_term')
    params = {'limit': 20, 'time_range': time_range}

    response = requests.get(API_BASE_URI + 'me/top/tracks', headers=headers, params=params)
    if response.status_code != 200:
        raise Exception(f"Error fetching tracks: {response.json()}")

    data = response.json()
    tracks = []

    tracks.extend({
        'Track':
        item['name'],
        'Artist':
        item['artists'][0]['name'],
        'Album':
        item['album']['name'],
        'Popularity':
        item['popularity'],
        'Spotify URL':
        item['external_urls']['spotify'],
        'Album Image': (item['album']['images'][0]['url']
                        if item['album']['images'] else None),
    } for item in data['items'])
    
    df = pd.DataFrame(tracks)
    df.to_csv(os.path.join(DATA_DIR, "top_tracks.csv"), index=False) 

    return df


def get_recent_plays_df(access_token):
    """
    Fetch the authenticated user's recently played tracks from the Spotify API and return as a DataFrame.

    Args:
        access_token (str): Spotify OAuth access token for the current user.

    Returns:
        pandas.DataFrame: DataFrame containing details of recently played tracks,
        including played time, track name, artist, album, popularity, Spotify URL, and album image.

    Raises:
        Exception: If the API request fails or returns a non-200 status code.
    """
    headers = {'Authorization': f'Bearer {access_token}'}
    params = {'limit': 30}

    response = requests.get(API_BASE_URI + 'me/player/recently-played', headers=headers, params=params)
    if response.status_code != 200:
        raise Exception(f"Error fetching recent plays: {response.json()}")

    data = response.json()
    recent_plays = []

    for item in data['items']:
        track = item['track']
        recent_plays.append({
            'Played At': item['played_at'],  # important for time analysis
            'Track': track['name'],
            'Artist': track['artists'][0]['name'] if track['artists'] else None,
            'Album': track['album']['name'] if track.get('album') else None,
            'Popularity': track.get('popularity'),
            'Spotify URL': track['external_urls'].get('spotify'),
            'Album Image': (
                track['album']['images'][0]['url'] if track['album'].get('images') else None
            ),
        })

    # Convert to DataFrame
    df = pd.DataFrame(recent_plays)

    # Ensure "Played At" is in datetime format for analysis
    df['Played At'] = pd.to_datetime(df['Played At'])

    # Save to CSV
    df.to_csv(os.path.join(DATA_DIR, "recently_played.csv"), index=False)

    return df


def get_top_artists_df(access_token):
    """
    Fetch the authenticated user's top artists from the Spotify API and return as a DataFrame.

    Args:
        access_token (str): Spotify OAuth access token for the current user.

    Returns:
        pandas.DataFrame: DataFrame containing details of top artists, including artist name,
        genres, followers, popularity, Spotify URL, and image.

    Raises:
        Exception: If the API request fails or returns a non-200 status code.
    """
    headers = {'Authorization': f'Bearer {access_token}'}
    params = {'limit': 20}

    response = requests.get(API_BASE_URI + 'me/top/artists', headers=headers, params=params)
    if response.status_code != 200:
        raise Exception(f"Error fetching artists: {response.json()}")

    data = response.json()
    artists = []
    
    artists.extend(
        {
            'Artist': item['name'],
            'Genres': ", ".join(item['genres']),
            'Followers': item['followers']['total'],
            'Popularity': item['popularity'],
            'Spotify URL': item['external_urls']['spotify'],
            'Image': item['images'][0]['url'] if item['images'] else None,
        } for item in data['items'])
    
    df = pd.DataFrame(artists)
    df.to_csv(os.path.join(DATA_DIR, "top_artists.csv"), index=False) 

    return df
