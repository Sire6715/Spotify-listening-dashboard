import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from collections import Counter

# Load saved data
tracks_df = pd.read_csv("data/top_tracks.csv")
artists_df = pd.read_csv("data/top_artists.csv")
recent_plays_df = pd.read_csv("data/recently_played.csv")
track_feature_df = pd.read_csv("data/SpotifyFeatures.csv")

track_stats = pd.merge(
     tracks_df,
     track_feature_df,
     right_on='Track',
     left_on='Track',
     how='left'
)

#Plays per day or per hour: Histogram
recent_plays_df['Played At'] = pd.to_datetime(recent_plays_df['Played At'])
plays_per_hour = recent_plays_df.set_index('Played At').resample('h').size()



#Most listened song features: horizontal stack bar chart
features = ['Danceability', 'Energy', 'Speechiness', 'Instrumentalness', 'Valence']
track_features = track_stats.groupby('Track')[features].sum().head(10)
total_sum = np.sum(track_features.to_numpy())


# Feature distribution
def feature_perc(df, features):
     """Calculates the percentage contribution of each feature in the DataFrame.

     Returns the percentage of each specified feature relative to the total sum of all features.

     Args:
          df (pd.DataFrame): The DataFrame containing the features.
          features (list): List of feature column names to include in the calculation.

     Returns:
          pd.Series: The percentage contribution of each feature.
     """
     total_sum = np.sum(df[features].to_numpy())
     individual_sum = df[features].sum(axis=0)
     return (individual_sum / total_sum) * 100




#Most-listened artists
most_listened_artist = tracks_df.groupby('Artist').count()['Track'].sort_values(ascending=False)



# Genre distribution: clustered column chart
genre_distribution = artists_df.groupby('Genres').count()
artists_df['Genres'] = artists_df['Genres'].fillna('').apply(
     lambda x: [g.strip() for g in x.split(',')] if x else [] 
)
all_genres = [genre for sublist in artists_df['Genres'] for genre in sublist]
genre_counts = Counter(all_genres)
genre_df = pd.DataFrame(genre_counts.items(), columns=['Genre', 'Count']).sort_values('Count', ascending=False)



