import Image from "next/image";
import { Play } from "lucide-react";
import { MediaCardProps } from "@/interfaces";

export default function MediaCard({
  image,
  title,
  meta,
  spotifyUrl,
}: MediaCardProps) {
  return (
    <div className="p-4 flex items-center border rounded-md shadow">
      <div className="mr-6">
        <Image
          src={image}
          alt={title}
          height={80}
          width={80}
          className="rounded-sm"
        />
      </div>

      <div className="mr-auto">
        <h2 className="font-bold mt-2">{title}</h2>

        {meta.map((m, i) => (
          <p key={i} className="text-[12px]">
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
        <Play className="text-white fill-white" size={18} />
      </a>
    </div>
  );
}