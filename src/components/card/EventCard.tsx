import Image from "next/image";
import React from "react";
import EventCategoryChip from "../chip/EventCategoryChip";
import { useRouter } from "@/navigation";
import { CalendarDays } from "lucide-react";

interface EventCardProps {
  id: string;
  eventImageSrc: string;
  eventName: string;
  description: string;
  startDate: Date;
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
        className=" h-28 w-full  rounded-t-xl"
      />

      <div className="p-2 flex flex-col gap-2">
        <div className="text-[#555] text-sm flex items-center gap-1">
          <CalendarDays size={14} />
          {startDate.toLocaleDateString()}
        </div>
        <div className="font-semibold mt-1 min-h-[6vh] max-h-[6vh]">
          {eventName.length > 30 ? eventName.substring(0, 30) + "..." : eventName}
        </div>
        <div className="text-[#555] text-sm mb-1 mt-1 max-h-[7vh] min-h-[7vh] text-pretty">
          {description}
        </div>

        <EventCategoryChip categoryId={categoryId + ""} />
      </div>
    </div>
  );
};

export default EventCard;
