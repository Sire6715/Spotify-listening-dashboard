import { useMemo } from "react";
import useSpotifyData from "@/hooks/useSpotifyData";

export default function ListeningSummary() {
  const { analysisData, loading } = useSpotifyData();

  const summary = useMemo(() => {
    if (!analysisData) return null;

    const { most_listened_artist, genre_distribution, plays_per_hour } =
      analysisData ?? {};

    const artists = Object.values(most_listened_artist?.Artist ?? {});
    const tracks = Object.values(most_listened_artist?.Track ?? {}) as number[];
    const topArtist = artists[0] as string | undefined;
    const topArtistCount = tracks[0] ?? 0;

    const topGenre = genre_distribution
      ? [...genre_distribution].sort((a, b) => b.Count - a.Count)[0]?.Genre
      : undefined;

    const totalPlays = plays_per_hour
      ? Object.values(plays_per_hour as Record<string, number>).reduce(
          (a, b) => a + b,
          0,
        )
      : 0;

    const hoursPlayed = ((totalPlays * 3.5) / 60).toFixed(1);

    return { topArtist, topArtistCount, topGenre, totalPlays, hoursPlayed };
  }, [analysisData]);

  if (loading || !summary) {
    return (
      <div className="h-40 rounded-xl p-6">
        <div className="h-8 w-full bg-[#282828] rounded-full mb-6 animate-pulse" />
        <div className="h-8 w-full bg-[#282828] rounded-full mb-6 animate-pulse" />
      </div>
    );
  }

  const { topArtist, topArtistCount, topGenre, totalPlays, hoursPlayed } =
    summary;

  return (
    <div className="rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#1DB954">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <p className="text-[#B3B3B3] text-[20px] font-bold tracking-widest uppercase m-0">
          Your Listening Summary
        </p>
      </div>

      {/* Summary sentence */}
      <p className="text-white text-base leading-relaxed m-0 mb-5">
        You listened to{" "}
        <span className=" lg:text-[25px] text-[#1DB954] font-bold">
          {topArtist}
        </span>{" "}
        the most —{" "}
        <span className=" lg:text-[25px] text-[#1DB954] font-bold">
          {topArtistCount}
        </span>{" "}
        {topArtistCount === 1 ? "time" : "times"} — and spent around{" "}
        <span className=" lg:text-[25px] text-[#1DB954] font-bold">
          {hoursPlayed} hours
        </span>{" "}
        listening across{" "}
        <span className=" lg:text-[25px] text-[#1DB954] font-bold">
          {totalPlays} plays
        </span>
        . Your taste leaned heavily into{" "}
        <span className=" lg:text-[25px] text-[#1DB954] font-bold capitalize">
          {topGenre}
        </span>
        .
      </p>

      {/* Stat pills */}
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 bg-[#282828] rounded-full px-3 py-1.5">
          <span className="text-[10px] text-[#B3B3B3] uppercase tracking-wider">
            Top Artist
          </span>
          <span className="text-xs text-white font-semibold">{topArtist}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#282828] rounded-full px-3 py-1.5">
          <span className="text-[10px] text-[#B3B3B3] uppercase tracking-wider">
            Hours
          </span>
          <span className="text-xs text-white font-semibold">
            {hoursPlayed}h
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#282828] rounded-full px-3 py-1.5">
          <span className="text-[10px] text-[#B3B3B3] uppercase tracking-wider">
            Top Genre
          </span>
          <span className="text-xs text-white font-semibold capitalize">
            {topGenre}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-[#282828] rounded-full px-3 py-1.5">
          <span className="text-[10px] text-[#B3B3B3] uppercase tracking-wider">
            Total Plays
          </span>
          <span className="text-xs text-white font-semibold">{totalPlays}</span>
        </div>
      </div>
    </div>
  );
}
