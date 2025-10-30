import pandas as pd

# Load saved data
tracks_df = pd.read_csv("data/top_tracks.csv")
artists_df = pd.read_csv("data/top_artists.csv")
recent_plays = pd.read_csv("data/recently_played.csv")
track_feature_df = pd.read_csv("data/SpotifyFeatures.csv")

track_stats = pd.merge(
     tracks_df,
     track_feature_df,
     right_on='Track',
     left_on='Track',
     how='left'
)

print(recent_plays.head())
