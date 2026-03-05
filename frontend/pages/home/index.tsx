"use client";
import useSpotifyData from "@/hooks/useSpotifyData";
import Hero from "@/components/spotify/Hero";


export default function Home() {
  const { topTracks, topArtists, analysisData, error } =
    useSpotifyData();

  if (error)
    return (
      <p className="text-xl font-black text-white">
        Refresh page to see tracks
      </p>
    );

  return (
    <div className="flex flex-col gap-16">
      <section className="max-w-2xl px-4">
        <p className="text-[11px] font-bold tracking-widest uppercase text-[#1DB954] mb-3">
          Welcome
        </p>
        <h2 className="text-white text-3xl sm:text-4xl font-bold leading-tight mb-4">
          Your music, laid bare.
        </h2>
        <p className="text-[#B3B3B3] text-base leading-relaxed">
          This is your personal Spotify breakdown — built from your real
          listening data. Explore the genres you gravitate toward, the artists
          you keep coming back to, and the hours you lose yourself in music. No
          algorithms, no curation. Just you and your taste.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-4">
        {[
          {
            label: "Top Tracks",
            value: topTracks?.length ?? "—",
            sub: "from your recent history",
          },
          {
            label: "Top Artists",
            value: topArtists?.length ?? "—",
            sub: "you keep coming back to",
          },
          {
            label: "Genres Found",
            value: analysisData?.genre_distribution?.length ?? "—",
            sub: "across your library",
          },
        ].map(({ label, value, sub }) => (
          <div
            key={label}
            className="bg-[#181818] border border-[#333333] rounded-xl p-6"
          >
            <p className="text-[#B3B3B3] text-[11px] font-bold tracking-widest uppercase m-0 mb-1">
              {label}
            </p>
            <p className="text-white text-4xl font-bold m-0">{value}</p>
            <p className="text-[#B3B3B3] text-xs mt-1 m-0">{sub}</p>
          </div>
        ))}
      </section>
      <Hero />
    </div>
  );
}
