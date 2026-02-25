import { useEffect, useState } from "react";

export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>("md");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setScreenSize("xs");
      } else if (window.innerWidth < 768) {
        setScreenSize("sm");
      } else if (window.innerWidth < 1024) {
        setScreenSize("md");
      } else if (window.innerWidth < 1280) {
        setScreenSize("lg");
      } else if (window.innerWidth < 1536) {
        setScreenSize("xl");
      } else {
        setScreenSize("2xl");
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};
