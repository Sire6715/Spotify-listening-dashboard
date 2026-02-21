import useSpotifyData from "@/hooks/useSpotifyData";
import MediaCard from "@/components/common/MediaCard";

export default function Tracks() {
  const { topTracks, loading, error, topArtists } = useSpotifyData();

  const formatnumber = (num: string | number) =>
    Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(Number(num));

  return (
    <div>
      <h1 className="font-bold text-4xl mt-8 mb-4">Top Tracks</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
        {topTracks.map((track, index) => (
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
    </div>
  );
}
