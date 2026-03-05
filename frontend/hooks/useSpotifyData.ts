/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import {
  SpotifyAnalytics,
  SpotifyUser,
  SpotifyTrack,
  SpotifyArtist,
} from "@/interfaces";

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function getCached(key: string) {
  const cached = localStorage.getItem(key);
  if (!cached) return null;

  const { data, expires } = JSON.parse(cached);
  if (Date.now() > expires) {
    localStorage.removeItem(key);
    return null;
  }
  return data;
}

function setCached(key: string, data: any, ttl: number = CACHE_TTL) {
  localStorage.setItem(
    key,
    JSON.stringify({ data, expires: Date.now() + ttl }),
  );
}

export default function useSpotifyData() {
  const [userData, setUserData] = useState<SpotifyUser | null>(null);
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
  const [analysisData, setAnalysisData] = useState<SpotifyAnalytics | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const config = { withCredentials: true };

        // Check frontend cache first
        const cachedUser = getCached("spotify_user");
        const cachedTracks = getCached("spotify_top_tracks");
        const cachedArtists = getCached("spotify_top_artists");
        const cachedAnalysis = getCached("spotify_analysis");

        if (cachedUser && cachedTracks && cachedArtists && cachedAnalysis) {
          setUserData(cachedUser);
          setTopTracks(cachedTracks);
          setTopArtists(cachedArtists);
          setAnalysisData(cachedAnalysis);
        } else {
          const [userRes, tracksRes, artistsRes, analysisRes] =
            await Promise.all([
              axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, config),
              axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/top_tracks`,
                config,
              ),
              axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/top_artists`,
                config,
              ),
              axios.get(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/analysis`,
                config,
              ),
            ]);

          setUserData(userRes.data);
          setTopTracks(tracksRes.data);
          setTopArtists(artistsRes.data);
          setAnalysisData(analysisRes.data);

          // Save to frontend cache
          setCached("spotify_user", userRes.data);
          setCached("spotify_top_tracks", tracksRes.data);
          setCached("spotify_top_artists", artistsRes.data);
          setCached("spotify_analysis", analysisRes.data);
        }
      } catch (err: any) {
        console.error("Error fetching Spotify data:", err);
        if (err.response?.status === 401) {
          window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/login`;
        } else {
          setError(err.message || "An error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, topTracks, topArtists, analysisData, loading, error };
}
