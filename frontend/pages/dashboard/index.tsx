import React from "react";
import useSpotifyData from "@/hooks/useSpotifyData";
import Image from "next/image";
import FeatureRadar from "@/components/charts/FeatureRadar";
import ArtistList from "@/components/charts/ArtistList";
import PlaysPerHour from "@/components/charts/PlaysPerHour";
import ListeningSummary from "@/components/charts/ListeningSummary";
import GenreDistribution from "@/components/charts/GenreDistribution";

const Dashboard = () => {
  const { userData, analysisData } = useSpotifyData();

  const imageUrl = userData?.images?.[0].url;
  const displayName = userData?.display_name;
  const email = userData?.email;
  const country = userData?.country;

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:p-4 min-h-screen dashboard">
      <div className="flex flex-col gap-4 flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row gap-4 items-stretch">
          <div className="bg-[#181818] border border-[#333333] rounded-xl p-6 flex sm:flex-col flex-row items-center justify-start sm:justify-center gap-4 sm:w-64 w-full shrink-0">
            <div className="bg-white p-1.5 rounded-full">
              {imageUrl ? (
                <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={displayName ?? "User"}
                    height={112}
                    width={112}
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-20 w-20 sm:h-28 sm:w-28 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold">
                  {displayName?.charAt(0).toUpperCase() ?? "U"}
                </div>
              )}
            </div>
            <div className="sm:text-center">
              <p className="text-white text-lg font-bold flex items-center sm:justify-center gap-1.5 m-0">
                {displayName}
                <span className="text-[9px] bg-[#1DB954] text-black px-1.5 py-0.5 rounded-full font-bold">
                  {country}
                </span>
              </p>
              <p className="text-[#B3B3B3] text-xs mt-0.5 m-0">{email}</p>
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <ListeningSummary />
          </div>
        </div>

        <GenreDistribution data={analysisData?.genre_distribution} />
        <PlaysPerHour data={analysisData?.plays_per_hour} />
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:w-72 w-full shrink-0">
        <div className="flex-1 lg:flex-none">
          <FeatureRadar data={analysisData?.feature_percentages} />
        </div>
        <div className="flex-1 lg:flex-none">
          <ArtistList data={analysisData?.most_listened_artist} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;