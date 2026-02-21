"use client";

import { useEffect } from "react";
import useSpotifyData from "@/hooks/useSpotifyData";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { SpotifyTrack } from "@/interfaces";

export default function TrackCarousel() {
  const { topTracks, loading, error } = useSpotifyData();

  const [emblaRef] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!topTracks || topTracks.length === 0) return <p>No tracks found</p>;

  return (
    <div className="relative w-full h-[25rem] mb-10 rounded-4xl overflow-hidden" ref={emblaRef}>
      <div className="flex w-full h-full">
        {topTracks.map((track: SpotifyTrack, index: number) => (
          <div
            key={index}
            className="flex-shrink-0 w-full h-full relative flex-col justify-end"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${track["Album Image"]})`,
              }}
            />

            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/50"></div>

            {/* Track info */}
            <div className="relative  text-white p-6 max-w-xl">
              <h2 className="text-4xl font-bold">{track.Album}</h2>
              <p className="text-xl mt-2">Artist: {track.Artist}</p>
              <p className="text-lg mt-2">Popularity: {track.Popularity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
