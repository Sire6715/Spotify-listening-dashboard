import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const SPOTIFY_GREEN = "#1DB954";
const SPOTIFY_GREEN_DIM = "#1aa34a";
const BORDER_COLOR = "#333333";

export interface GenreEntry {
  Genre: string;
  Count: number;
}

interface GenreBarProps {
  data: GenreEntry[];
}

interface SpotifyTooltipProps {
  active?: boolean;
  payload?: { value?: number | string }[];
  label?: string;
}

function SpotifyTooltip({ active, payload, label }: SpotifyTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#282828] border border-[#333333] rounded-lg px-3.5 py-2.5 text-sm text-white">
      <p className="text-[#B3B3B3] mb-1 m-0">{label}</p>
      <p className="text-[#1DB954] font-semibold m-0">{payload[0].value} tracks</p>
    </div>
  );
}

export default function GenreBar({ data }: GenreBarProps) {
  const [showAll, setShowAll] = useState(false);

  const sorted = useMemo(() => {
    if (!Array.isArray(data?.genre_distribution)) return [];
    return [...data?.genre_distribution].sort((a, b) => b.Count - a.Count);
  }, [data]);

  const visible = showAll ? sorted : sorted.slice(0, 7);

  if (!sorted.length) {
    return (
      <div className="bg-[#181818] rounded-xl p-6 border border-[#333333] h-[300px] flex items-center justify-center">
        <p className="text-[#B3B3B3] text-sm">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#181818] rounded-xl p-6 border border-[#333333]">
      <p className="text-[#B3B3B3] text-[11px] font-bold tracking-widest uppercase mb-4 mt-0">
        Genre Distribution
      </p>

      <ResponsiveContainer width="80%" height={visible.length * 34 + 20}>
        <BarChart
          data={visible}
          layout="vertical"
          margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
        >
          <XAxis
            type="number"
            tick={{ fill: "#B3B3B3", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="Genre"
            tick={{ fill: "#FFFFFF", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={95}
          />
          <Tooltip content={<SpotifyTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="Count" radius={[0, 4, 4, 0]} maxBarSize={20}>
            {visible.map((entry, i) => (
              <Cell
                key={entry.Genre}
                fill={i === 0 ? SPOTIFY_GREEN : i < 5 ? SPOTIFY_GREEN_DIM : "#3a3a3a"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {sorted.length > 10 && (
        <button
          onClick={() => setShowAll((v) => !v)}
          className="mt-3 px-3.5 py-1.5 rounded-full text-xs text-[#B3B3B3] border border-[#333333] bg-transparent cursor-pointer hover:border-white hover:text-white transition-colors"
        >
          {showAll ? "Show less" : `Show all ${sorted.length} genres`}
        </button>
      )}
    </div>
  );
}