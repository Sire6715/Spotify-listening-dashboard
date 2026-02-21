/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { useEffect, useState } from "react";
import { SpotifyAnalytics, SpotifyUser,  SpotifyTrack, SpotifyArtist} from "@/interfaces";

export default function useSpotifyData() {
 const [userData, setUserData] = useState<SpotifyUser[]>();
 const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
 const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
 const [analysisData, setAnalysisData] = useState<SpotifyAnalytics[]>([]);
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string | null>(null);

 useEffect(() => {
     const fetchData = async () => {
          setLoading(true);
          try{
               const config = {
                    withCredentials: true
               };

               const [userRes, tracksRes, artistsRes, analysisRes] = await Promise.all([
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, config),
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/top_tracks`, config),
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/top_artists`, config),
                    axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/analysis`, config)
               ]);

               setUserData(userRes.data);
               setTopTracks(tracksRes.data);
               setTopArtists(artistsRes.data);
               setAnalysisData(analysisRes.data);
          }catch(err:any){
               console.error("Error fetching Spotify data:", err);
               setError(err.message || "An error occurred");
          }finally{
               setLoading(false);
          }
 };

 fetchData();
 }, []);

return { userData, topTracks, topArtists, analysisData, loading, error }
}