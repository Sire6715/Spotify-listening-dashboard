"use client";

import React from "react";
import { useStateContext } from "@/hooks/useStateContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChartNetwork, House, Disc3, ListMusic } from "lucide-react";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useStateContext();
  const router = useRouter();

  console.log(isSidebarOpen);

  return (
    <AnimatePresence>
      {isSidebarOpen && (
<>
        <div
            className="fixed  inset-0 z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        <motion.aside
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -500, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
          }}
          className={`p-5 fixed top-0  bg-[#0a0a0a] ${
            isSidebarOpen ? " h-screen flex " : "hidden"
          } col-span-1 w-85 xl:w-[20%] z-30`}
        >
          <ul className="flex-col mt-18 items-center justify-center w-full gap-12">
            <li
              onClick={() => router.push("/home")}
              className="flex cursor-pointer gap-2 mb-8 items-center text-[14px]"
            >
              <House /> Home
            </li>
            <li
              onClick={() => {
                router.push("/artists");
                setIsSidebarOpen(false);
              }}
              className="flex cursor-pointer gap-2 mb-8 items-center text-[14px]"
            >
              <ListMusic /> Most Listened Artist
            </li>
            <li
              onClick={() => {
                router.push("/tracks");
                setIsSidebarOpen(false);
              }}
              className="flex cursor-pointer gap-2 mb-8 items-center text-[14px]"
            >
              <Disc3 /> Most Listened Tracks{" "}
            </li>
            <li
              onClick={() => {
                router.push("/dashboard");
                setIsSidebarOpen(false);
              }}
              className="flex cursor-pointer gap-2 mb-8 items-center text-[14px]"
            >
              <ChartNetwork /> Dashboard{" "}
            </li>
            <li></li>
          </ul>
        </motion.aside></>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
