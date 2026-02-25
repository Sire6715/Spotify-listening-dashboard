import Image from "next/image";
import { Play } from "lucide-react";
import { MediaCardProps } from "@/interfaces";
import { useScreenSize } from "@/hooks/useScreenSize";

export default function MediaCard({
  image,
  title,
  meta,
  spotifyUrl,
}: MediaCardProps) {
  const screenSize = useScreenSize();
  const imgSize = screenSize === "xs" || screenSize === "sm" ? 60 : 120;
  const playSize = screenSize === "xs" || screenSize === "sm" ? 14 : 33;
  
  return (
    <div className="p-4 flex items-center border rounded-md shadow">
      <div className="mr-6">
        <Image
          src={image}
          alt={title}
          height={imgSize}
          width={imgSize}
          className="rounded-sm"
        />
      </div>

      <div className="mr-auto">
        <h2 className="font-bold mt-2 lg:text-2xl">{title}</h2>

        {meta.map((m, i) => (
          <p key={i} className="xs:text-[16px] text-[12px]">
            {m.label}: {m.value}
          </p>
        ))}
      </div>

      <a
        href={spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#1DB954] p-2 rounded-full flex items-center justify-center"
      >
        <Play className="text-white fill-white" size={playSize} />
      </a>
    </div>
  );
}
