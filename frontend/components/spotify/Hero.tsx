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

if (loading) {
  return (
    <div className="rounded-xl p-6 ">
      <div className="h-3 w-24 bg-[#282828] rounded-full mb-6 animate-pulse" />
      <ul className="m-0 p-0 list-none flex flex-col gap-1">
        {[...Array(8)].map((_, i) => (
          <li key={i} className="flex items-center justify-between py-3 border-b border-[#282828] last:border-b-0 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-4 h-3 bg-[#282828] rounded-full" />
              <div className="w-10 h-10 bg-[#282828] rounded-lg" />
              <div className="h-3 w-28 bg-[#282828] rounded-full" />
            </div>
            <div className="h-8 w-8 bg-[#282828] rounded-md" />
          </li>
        ))}
      </ul>
    </div>
  );
}
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
            title={track.Track}
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
