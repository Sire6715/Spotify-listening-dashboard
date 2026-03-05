/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "./Header";
import Footer from "./Footer";
import { ReactNodeProps } from "@/interfaces/index";
import useSpotifyData from "@/hooks/useSpotifyData";
import Sidebar from "../spotify/Sidebar";
import { Red_Hat_Display } from "next/font/google";

const red_hat_display = Red_Hat_Display({
  variable: "--font-red-hat-display",
  subsets: ["latin"],
});

const Layout: React.FC<ReactNodeProps> = ({ children }) => {
  const { userData } = useSpotifyData();

  return (
    <div className={`${red_hat_display.className} bg-[#121212]`}>
      <Sidebar />
      <div className={"px-5"}>
        <Header {...(userData as any)} />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
