import Image from "next/image";
import React from "react";
import EventCategoryChip from "../chip/EventCategoryChip";

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
  return (
    <div className="w-full shadow border mt-6 rounded-xl">
      <Image
        src={eventImageSrc}
        width={1920}
        height={1080}
        alt="event image"
        className="w-full h-full rounded-t-xl"
      />

      <div className="p-2 flex flex-col gap-2">
        <div className="text-[#555] text-sm">{startDate}</div>
        <div className="font-semibold mt-1">{eventName}</div>
        <div className="text-[#555] text-sm mb-1">{description}</div>

        <EventCategoryChip categoryId={categoryId + ""} />
      </div>
    </div>
  );
};

export default EventCard;
