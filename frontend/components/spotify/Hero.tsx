import useSpotifyData from "@/hooks/useSpotifyData";
import TrackCarousel from "./Carousel";
import MediaCard from "../common/MediaCard";
import { useRouter } from "next/router";

export default function Hero() {
  const { topTracks, loading, error, topArtists } = useSpotifyData();
  const router = useRouter();

  const formatnumber = (num: string | number) =>
    Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(Number(num));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <TrackCarousel />

      {/* TOP TRACKS */}
      <h1 className="font-bold text-4xl my-9">Top Tracks</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
        {topTracks.slice(0, 5).map((track, index) => (
          <MediaCard
            key={index}
            image={track["Album Image"]}
            title={track.Album}
            spotifyUrl={track["Spotify URL"]}
            meta={[
              { label: "Album", value: track.Album },
              { label: "Artist", value: track.Artist },
              { label: "Popularity", value: track.Popularity },
            ]}
          />
        ))}
      </div>
      <div className="flex items-center justify-center my-6">
        <h1 onClick={() => router.push("/tracks")} className="underline cursor-pointer text-white font-bold">
          See More
        </h1>
      </div>

      {/* TOP ARTISTS */}
      <h1 className="font-bold text-4xl mt-8 mb-4">Top Artists</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
        {topArtists.slice(0, 5).map((artist, index) => (
          <MediaCard
            key={index}
            image={artist.Image}
            title={artist.Artist}
            spotifyUrl={artist["Spotify URL"]}
            meta={[
              { label: "Followers", value: formatnumber(artist.Followers) },
              { label: "Genres", value: artist.Genres },
              { label: "Popularity", value: artist.Popularity },
            ]}
          />
        ))}
      </div>
      <div className="flex items-center justify-center my-6">
        <h1 onClick={() => router.push("/artists")} className="underline cursor-pointer text-white font-bold">
          See More
        </h1>
      </div>
    </div>
  );
}
