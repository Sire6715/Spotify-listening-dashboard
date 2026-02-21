import useSpotifyData from "@/hooks/useSpotifyData";
import MediaCard from "@/components/common/MediaCard";

export default function Artist() {
  const { topTracks, loading, error, topArtists } = useSpotifyData();

  const formatnumber = (num: string | number) =>
    Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(Number(num));

  return (
    <div>
      <h1 className="font-bold text-4xl mt-8 mb-4">Top Artists</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
        {topArtists?.map((artist, index) => (
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
    </div>
  );
}
