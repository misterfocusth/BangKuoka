import Image from "next/image";
import React from "react";
import EventCategoryChip from "../chip/EventCategoryChip";
import { useRouter } from "@/navigation";

interface EventCardProps {
  id: string;
  eventImageSrc: string;
  eventName: string;
  description: string;
  startDate: string;
  categoryId: number;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  eventImageSrc,
  eventName,
  description,
  startDate,
  categoryId,
}) => {
  const router = useRouter();

  return (
    <div
      className="w-full shadow border mt-6 rounded-xl"
      onClick={() => router.push("/event/" + id)}
    >
      <Image
        src={eventImageSrc}
        width={1920}
        height={1080}
        alt="event image"
        className="w-full h-full rounded-t-xl"
      />

      <div className="p-2 flex flex-col gap-2">
        <div className="text-[#555] text-sm">{startDate}</div>
        <div className="font-semibold mt-1 min-h-[6vh]">{eventName}</div>
        <div className="text-[#555] text-sm mb-1">{description}</div>

        <EventCategoryChip categoryId={categoryId + ""} />
      </div>
    </div>
  );
};

export default EventCard;
