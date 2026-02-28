import useSpotifyData from "@/hooks/useSpotifyData";
import MediaCard from "@/components/common/MediaCard";

export default function Tracks() {
  const { topTracks, loading } = useSpotifyData();


  if (loading) {
    return (
      <div className="rounded-xl p-6 h-full">
        <h1 className="font-bold text-4xl mt-8 mb-4">Top Tracks</h1>
        <div className="h-3 w-24 bg-[#282828] rounded-full mb-6 animate-pulse" />
        <ul className="m-0 p-0 list-none flex flex-col gap-1">
          {[...Array(8)].map((_, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-3 border-b border-[#282828] last:border-b-0 animate-pulse"
            >
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

  return (
    <div>
      <h1 className="font-bold text-4xl mt-8 mb-4">Top Tracks</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-6">
        {topTracks.map((track, index) => (
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
    </div>
  );
}
