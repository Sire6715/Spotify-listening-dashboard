import { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  DotProps,
} from "recharts";

const SPOTIFY_GREEN = "#1DB954";
const BORDER_COLOR = "#333333";
const SURFACE_COLOR = "#181818";

interface PlaysPerHourProps {
  data: Record<string, number> | undefined;
}

interface ChartEntry {
  label: string;
  plays: number;
  ts: string;
}

interface SpotifyTooltipProps {
  active?: boolean;
  payload?: { value?: number | string }[];
  label?: string;
}

function SpotifyTooltip({ active, payload, label }: SpotifyTooltipProps) {
  if (!active || !payload?.length) return null;
  const count = payload[0].value as number;
  return (
    <div className="bg-[#282828] border border-[#333333] rounded-lg px-3.5 py-2.5 text-sm text-white">
      <p className="text-[#B3B3B3] mb-1 m-0">{label}</p>
      <p className="text-[#1DB954] font-semibold m-0">
        {count} {count === 1 ? "play" : "plays"}
      </p>
    </div>
  );
}

function CustomDot(props: DotProps & { value?: number }) {
  const { cx = 0, cy = 0, value } = props;
  if (!value) return <circle cx={cx} cy={cy} r={0} />;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5}
      fill={SPOTIFY_GREEN}
      stroke={SURFACE_COLOR}
      strokeWidth={2}
    />
  );
}

export default function PlaysPerHour({ data }: PlaysPerHourProps) {
  const [zoom, setZoom] = useState(true);

  const chartData: ChartEntry[] = useMemo(() => {
    if (!data || typeof data !== "object") return [];
    return Object.entries(data as Record<string , number>).map(([ts, plays]) => {
      const d = new Date(ts.replace(" ", "T"));
      const label = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, "0")}h`;
      return { label, plays, ts };
    });
  }, [data]);

  const visible = useMemo(() => {
    if (!zoom) return chartData;
    const nonZeroIdx = chartData.reduce<number[]>(
      (acc, d, i) => (d.plays > 0 ? [...acc, i] : acc),
      []
    );
    if (!nonZeroIdx.length) return chartData;
    const min = Math.max(0, nonZeroIdx[0] - 2);
    const max = Math.min(chartData.length - 1, nonZeroIdx[nonZeroIdx.length - 1] + 2);
    return chartData.slice(min, max + 1);
  }, [chartData, zoom]);


if (!chartData.length) {
  return (
    <div className="bg-[#181818] h-[23rem] rounded-xl p-6 border border-[#333333]">
      <div className="h-full w-full bg-[#282828] rounded-full mb-6 animate-pulse" />
    </div>
  );
}

  return (
    <div className="bg-[#181818] rounded-xl p-6 border border-[#333333]">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#B3B3B3] text-[11px] font-bold tracking-widest uppercase m-0">
          Plays Per Hour
        </p>
        <button
          onClick={() => setZoom((v) => !v)}
          className={`px-3 py-1 rounded-full text-[11px] font-bold border cursor-pointer transition-colors ${
            zoom
              ? "bg-[#1DB954] border-[#1DB954] text-black"
              : "bg-transparent border-[#333333] text-[#B3B3B3] hover:border-white hover:text-white"
          }`}
        >
          {zoom ? "Active periods" : "All hours"}
        </button>
      </div>

      <ResponsiveContainer width="100%" height={263}>
        <LineChart data={visible} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid stroke={BORDER_COLOR} strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="label"
            tick={{ fill: "#B3B3B3", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fill: "#B3B3B3", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<SpotifyTooltip />} />
          <Line
            type="monotone"
            dataKey="plays"
            stroke={SPOTIFY_GREEN}
            strokeWidth={2.5}
            dot={<CustomDot />}
            activeDot={{ r: 7, fill: SPOTIFY_GREEN, stroke: SURFACE_COLOR, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}