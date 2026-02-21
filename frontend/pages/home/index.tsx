"use client"
import useSpotifyData from "@/hooks/useSpotifyData";
import Hero from "@/components/spotify/Hero"


export default function Home() {   
  const { userData, topTracks, topArtists, analysisData, loading, error } = useSpotifyData();

  console.log(userData)
  console.log(topTracks)
  console.log(topArtists)
  console.log(analysisData)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Hero />
    </div>
  );
}
  