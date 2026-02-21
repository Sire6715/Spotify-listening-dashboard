import { useMemo } from "react";

export interface MostListenedArtist {
  Artist: Record<string, string>;
  Track: Record<string, number>;
}

interface ArtistListProps {
  data: MostListenedArtist;
}

interface ArtistEntry {
  artist: string;
  tracks: number;
}

export default function ArtistList({ data }: ArtistListProps) {
  const top3: ArtistEntry[] = useMemo(() => {
    if (!data?.Artist || !data?.Track) return [];
    const artists = Object.values(data.Artist);
    const tracks = Object.values(data.Track);
    return artists
      .map((artist, i) => ({ artist, tracks: tracks[i] }))
      .sort((a, b) => b.tracks - a.tracks)
      .slice(0, 3);
  }, [data]);

  if (!top3.length) {
    return (
      <div className="bg-[#181818] rounded-xl p-6 border border-[#333333] h-[300px] flex items-center justify-center">
        <p className="text-[#B3B3B3] text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#181818] rounded-xl p-6 border border-[#333333] h-full">
      <p className="text-[#B3B3B3] text-[11px] font-bold tracking-widest uppercase mb-4 mt-0">
        Most Listened Artists This Week
      </p>

      <ul className="m-0 p-0 list-none flex flex-col gap-1">
        {top3.map((entry, i) => (
          <li
            key={entry.artist}
            className="flex items-center justify-between py-1 border-b border-[#282828] last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <span className="text-[#B3B3B3] text-xs w-4 tabular-nums shrink-0">{i + 1}</span>
              <span
                className="text-sm font-medium"
                style={{ color: i === 0 ? "#1DB954" : "#FFFFFF" }}
              >
                {entry.artist}
              </span>
            </div>

            <div className="flex flex-col items-end">
              <span
                className="text-3xl font-bold tabular-nums leading-none"
                style={{ color: i === 0 ? "#1DB954" : "#B3B3B3" }}
              >
                {entry.tracks}
              </span>
              <span className="text-[10px] text-[#B3B3B3] mt-0.5">
                {entry.tracks === 1 ? "track" : "tracks"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}