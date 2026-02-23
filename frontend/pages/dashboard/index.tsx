import React from "react";
import useSpotifyData from "@/hooks/useSpotifyData";
import Image from "next/image";
import FeatureRadar from "@/components/charts/FeatureRadar";
import ArtistList from "@/components/charts/ArtistList";
import PlaysPerHour from "@/components/charts/PlaysPerHour";
import ListeningSummary from "@/components/charts/ListeningSummary";

const Dashboard = () => {
  const { userData, analysisData } = useSpotifyData();

  const imageUrl = userData?.images?.[0].url;
  const displayName = userData?.display_name;
  const email = userData?.email;
  const country = userData?.country;

  {
    console.log(analysisData);
  }
  return (
    <div className="grid grid-cols-8 dashboard">
      <div className="col-span-6  flex flex-col">
        <div className="h-1/2 grid grid-cols-3 m-0">
          <div className="flex flex-col m-2 space-between items-center ">
            <div className="bg-white p-3 rounded-full">
              {imageUrl ? (
                <div className="h-37 w-37 rounded-full overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={displayName ?? "User"}
                    height={250}
                    width={250}
                  />
                </div>
              ) : (
                <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center text-xl">
                  {displayName?.charAt(0).toUpperCase() ?? "U"}
                </div>
              )}
            </div>

            <ul className="text-[#f2f2f2] mt-2 flex flex-col items-center">
              <li className="text-3xl flex items-center gap-2 font-bold">
                {displayName}{" "}
                <span className="text-[9px] flex bg-[#1DB954] px-1.5 py-0.5 rounded-full">
                  {country}
                </span>
              </li>
              <li className="font-semibold text-[14px]">{email}</li>
            </ul>
          </div>

          <div className="col-span-2">
            <ListeningSummary />
          </div>
        </div>

        <div className="">
          <PlaysPerHour data={analysisData?.plays_per_hour} />
        </div>
      </div>

      <div className="flex flex-col col-span-2 gap-4">
        <ArtistList data={analysisData?.most_listened_artist} />
        <FeatureRadar data={analysisData?.feature_percentages} />
      </div>
    </div>
  );
};

export default Dashboard;
