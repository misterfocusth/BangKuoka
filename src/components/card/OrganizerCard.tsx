import { useRouter } from "@/navigation";
import Image from "next/image";
import React from "react";

interface OrganizerCardProps {
  name: string;
  imageSrc: string;
  id: string;
}

const OrganizerCard: React.FC<OrganizerCardProps> = ({ name, imageSrc, id }) => {
  const router = useRouter();

  return (
    <div
      className="w-full shadow border mt-6 rounded-xl p-4 min-h-48"
      onClick={() => router.push("/organizer/" + id)}
    >
      <Image
        src={imageSrc}
        width={1920}
        height={1080}
        alt="organier image"
        className=" w-20 h-20 rounded-full flex items-center justify-center mx-auto"
      />
      <div className="mt-4 text-center font-semibold text-sm">{name}</div>
    </div>
  );
};

export default OrganizerCard;
