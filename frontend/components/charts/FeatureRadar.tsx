import { useMemo } from "react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {FeatureRadarProps, ChartEntry, SpotifyTooltipProps} from "@/interfaces"

const SPOTIFY_GREEN = "#1DB954";
const BORDER_COLOR = "#333333";


function SpotifyTooltip({ active, payload, label }: SpotifyTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#282828] border border-[#333333] rounded-lg px-3.5 py-2.5 text-sm text-white">
      <p className="text-[#B3B3B3] mb-1 m-0">{label}</p>
      <p className="text-[#1DB954] font-semibold m-0">{payload[0].value}%</p>
    </div>
  );
}

export default function FeatureRadar({ data }: FeatureRadarProps) {
  const chartData: ChartEntry[] = useMemo(() => {
    if (
      !data ||
      typeof data !== "object"
    )
      return [];
    return Object.entries(data as Record<string, number>).map(([key, value]) => ({
      feature: key,
      value,
      fullMark: 100,
    }));
  }, [data]);

  if (!chartData.length) {
    return (
      <div className="bg-[#181818] h-92 rounded-xl p-6 border border-[#333333]">
        <div className="h-full w-full bg-[#282828] rounded-full mb-6 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="bg-[#181818] rounded-xl p-6 border border-[#333333]">
      <p className="text-[#B3B3B3] text-[11px] font-bold tracking-widest uppercase mb-4 mt-0">
        Audio Feature Profile
      </p>

      <ResponsiveContainer width="80%" height={180}>
        <RadarChart
          data={chartData}
          margin={{ top: 10, right: 30, bottom: 10, left: 30 }}
        >
          <PolarGrid stroke={BORDER_COLOR} />
          <PolarAngleAxis
            dataKey="feature"
            tick={{ fill: "#B3B3B3", fontSize: 12, fontWeight: 600 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: BORDER_COLOR, fontSize: 10 }}
            axisLine={false}
          />
          <Radar
            name="Features"
            dataKey="value"
            stroke={SPOTIFY_GREEN}
            fill={SPOTIFY_GREEN}
            fillOpacity={0.25}
            strokeWidth={2}
            dot={{ fill: SPOTIFY_GREEN, r: 4 }}
          />
          <Tooltip content={<SpotifyTooltip />} />
        </RadarChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap gap-1.5 mt-2">
        {chartData.map((d) => (
          <div key={d.feature} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#1DB954]" />
            <span className="text-[#B3B3B3] text-[9px]">
              {d.feature}:{" "}
              <span className="text-white font-semibold">{d.value}%</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
