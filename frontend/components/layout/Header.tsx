"use client";

import React from "react";
import { SpotifyUser } from "@/interfaces";
import Image from "next/image";
import { useStateContext } from "@/hooks/useStateContext";
import { Menu, X } from "lucide-react";

const Header: React.FC<SpotifyUser> = ({
  images = [],
  display_name,
}) => {
  const { isSidebarOpen, setIsSidebarOpen } = useStateContext();


  return (
    <div className="flex flex-row bg-[#121212] items-center justify-between p-2 mb-6">
      <div>
        {isSidebarOpen ? (
          <X onClick={() => setIsSidebarOpen((prev) => !prev)} />
        ) : (
          <Menu onClick={() => setIsSidebarOpen((prev) => !prev)} />
        )}
      </div>
      <div className="flex flex-col-reverse items-center">
        {images && images.length > 0 && images[0]?.url ? (
          <div className="h-12 w-12 bg-gray-200 rounded-full">
            <Image
              src={images[0].url}
              alt={display_name ?? "User"}
              height={images[0].height}
              width={images[0].width}
              className="rounded-full"
            />
          </div>
        ) : (
          <div className="h-12 w-12 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-600">
            {display_name ? display_name.charAt(0).toUpperCase() : "U"}
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
