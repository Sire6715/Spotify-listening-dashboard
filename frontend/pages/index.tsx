import { League_Spartan } from "next/font/google";
import LoginPage from "@/components/spotify/Login";

const league_spartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${league_spartan.className} flex min-h-screen items-center justify-center bg-[#121212] font-sans dark:bg-black`}
    >
      <LoginPage />
    </div>
  );
}
