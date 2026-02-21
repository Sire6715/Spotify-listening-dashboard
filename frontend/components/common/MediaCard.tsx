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

      <div className="bg-[#1DB954] p-2 rounded-full">
        <Play className="bg-[#1DB954]" href={spotifyUrl} />
      </div>
    </div>
  );
}
