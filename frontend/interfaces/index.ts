
export interface ReactNodeProps {
  children: React.ReactNode;
}

export interface StateContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface SpotifyUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: { url: string; height?: number; width?: number }[];
  product: string;
  type: string;
  uri: string;
}

export interface ButtonProps {
  text: string;
  style: string;
  onClick: () => void;
}

export interface SpotifyTrack {
  Album: string;
  "Album Image": string;
  Artist: string;
  Popularity: number;
  "Spotify URL": string;
  Duration?: string;
  Preview?: string;
}

export interface MediaCardProps {
  image: string;
  title: string;
  meta: { label: string; value: string | number }[];
  spotifyUrl: string;
}

export interface SpotifyArtist {
  Artist: string;
  Followers: number;
  Genres: string;
  Image: string;
  Popularity: number;
  "Spotify URL": string;
}

export interface SpotifyAnalytics {
  feature_percentages: {
    Danceability: number;
    Energy: number;
    Instrumentalness: number;
    Speechiness: number;
    Valence: number;
  };
  genre_distribution: {
    Genre: string;
    Count: number;
  }[];
  most_listened_artist: Record<string, number>;
  plays_per_hour: Record<string, number>;
}
