
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
  Track: string;
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
  feature_percentages: Record<string, number>;
  genre_distribution: { Genre: string; Count: number }[];
  most_listened_artist: {
    Artist: Record<string, string>;
    Track: Record<string, number>;
  };
  plays_per_hour: Record<string, number>;
}

export interface FeatureRadarProps {
  data: Record<string, number> | undefined;
}

export interface ChartEntry {
  feature: string;
  value: number;
  fullMark: number;
}

export interface SpotifyTooltipProps {
  active?: boolean;
  payload?: { value?: number | string }[];
  label?: string;
}

export interface MostListenedArtist {
  Artist: Record<string, string>;
  Track: Record<string, number>;
}

export interface ArtistListProps {
  data: MostListenedArtist | undefined;
}

export interface ArtistEntry {
  artist: string;
  tracks: number;
}


export interface GenreEntry {
  Count: number;
  Genre: string;
}

export interface GenreDistributionProps {
  data: GenreEntry[] | undefined;
}

export interface TooltipProps {
  active?: boolean;
  payload?: { name?: string; value?: number; payload?: { percent?: number } }[];
}