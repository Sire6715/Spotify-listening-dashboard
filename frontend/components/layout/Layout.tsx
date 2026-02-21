/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "./Header";
import Footer from "./Footer";
import { ReactNodeProps } from "@/interfaces/index";
import useSpotifyData from "@/hooks/useSpotifyData";
import Sidebar from "../spotify/Sidebar";
import { useStateContext } from "@/hooks/useStateContext";
import { League_Spartan } from "next/font/google";

const league_spartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});



const Layout: React.FC<ReactNodeProps> = ({ children }) => {
  const { userData } = useSpotifyData();
  const { isSidebarOpen } = useStateContext();

  return (
    <div className={`${league_spartan.className} grid gap-8 grid-cols-5 bg-[#121212]`}>
      <Sidebar />
      <div className={`px-10 ${isSidebarOpen ? "col-span-4 w-full " : "col-span-5"}`}>
        <Header {...(userData as any)} />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
