import { useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useScreenSize } from "@/hooks/useScreenSize";
import {GenreDistributionProps, TooltipProps} from "@/interfaces"

// const SPOTIFY_GREEN = "#1DB954";

const GENRE_COLORS = ["#1DB954", "#1ed760", "#17a844", "#148a38", "#0f6b2b"];
const OTHER_COLOR = "#535353";


function SpotifyTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const { name, value, payload: inner } = payload[0];
  const pct = inner?.percent != null ? (inner.percent * 100).toFixed(1) : null;
  return (
    <div className="bg-[#282828] border border-[#333333] rounded-lg px-3.5 py-2.5 text-sm text-white">
      <p className="text-[#B3B3B3] mb-1 m-0 capitalize">{name}</p>
      <p className="text-[#1DB954] font-semibold m-0">
        {value} {value === 1 ? "track" : "tracks"}
        {pct && (
          <span className="text-[#B3B3B3] font-normal ml-1">({pct}%)</span>
        )}
      </p>
    </div>
  );
}

export default function GenreDistribution({ data }: GenreDistributionProps) {
  const screenSize = useScreenSize();
  const innerRadius = screenSize === "xs" || screenSize === "md" ? 25 : 50;
  const outerRadius = screenSize === "xs" || screenSize === "md" ? 60 : 85;


  const chartData = useMemo(() => {
    if (!data?.length) return [];
    const top3 = data.slice(0, 3);
    const otherCount = data.slice(5).reduce((sum, g) => sum + g.Count, 0);
    const entries = top3.map((g) => ({ name: g.Genre, value: g.Count }));
    if (otherCount > 0) entries.push({ name: "other", value: otherCount });
    return entries;
  }, [data]);

  if (!chartData.length) {
    return (
      <div className="bg-[#181818] h-92 rounded-xl p-6 border border-[#333333]">
        <div className="h-full w-full bg-[#282828] rounded-xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-[#181818] rounded-xl p-6 border border-[#333333]">
      <p className="text-[#B3B3B3] text-[11px] font-bold tracking-widest uppercase m-0 mb-4">
        Genre Breakdown
      </p>

      <div className="flex items-center gap-6">
        <ResponsiveContainer width="55%" height={220}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {chartData.map((entry, i) => (
                <Cell
                  key={entry.name}
                  fill={entry.name === "other" ? OTHER_COLOR : GENRE_COLORS[i]}
                />
              ))}
            </Pie>
            <Tooltip content={<SpotifyTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 flex-1 min-w-0">
          {chartData.map((entry, i) => {
            const total = chartData.reduce((s, d) => s + d.value, 0);
            const pct = ((entry.value / total) * 100).toFixed(0);
            const color =
              entry.name === "other" ? OTHER_COLOR : GENRE_COLORS[i];
            return (
              <div key={entry.name} className="flex items-center gap-2 min-w-0">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-white text-[10px] md:text-[12px] capitalize truncate flex-1">
                  {entry.name}
                </span>
                <span className="text-[#B3B3B3] text-[9px] md:text-[11px] shrink-0">
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
