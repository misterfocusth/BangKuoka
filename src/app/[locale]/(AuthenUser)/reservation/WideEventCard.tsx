"use client";

import EventCategoryChip from "@/components/chip/EventCategoryChip";
import { useRouter } from "@/navigation";
import { CalendarDaysIcon, Info, MapPin, Ticket } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface EventCardProps {
  id: string;
  eventImageSrc: string;
  eventName: string;
  description: string;
  categoryId: number;
  reservedOn?: Date;
  ticketAmount?: number;
  statusId?: number;
  eventLocation: string;
}

const WideEventCard: React.FC<EventCardProps> = ({
  id,
  eventImageSrc,
  eventName,
  description,
  categoryId,
  reservedOn,
  ticketAmount,
  statusId,
  eventLocation,
}) => {
  const router = useRouter();
  const t = useTranslations("Index");

  let reserveStatus = "";
  let statusColor = "";

  if (statusId === 0) {
    reserveStatus = t("reserved_status_label");
    statusColor = "#136912";
  } else if (statusId === 1) {
    reserveStatus = t("canceled_status_label");
    statusColor = "#D20000";
  } else {
    reserveStatus = t("completed_status_label");
    statusColor = "#136912";
  }

  return (
    <div>
      <div
        className="w-full shadow border mt-6 rounded-xl"
        onClick={() => router.push("/event/" + id)}
      >
        <Image
          src={eventImageSrc}
          width={1920}
          height={1080}
          alt="event image"
          className="w-full h-40 object-cover rounded-t-xl"
        />

        <div className=" flex flex-col gap-2 p-4">
          <div className="flex items-center justify-between gap-4">
            <div className="font-semibold mt-1 min-h-[5vh]">{eventName}</div>
            <EventCategoryChip categoryId={categoryId + ""} />
          </div>
          <div className="text-[#555] text-sm mb-1">{description.substring(0, 100)}</div>

          <div className="flex items-center justify-between gap-6 mt-1">
            <div className="flex items-center gap-2 w-1/2">
              <MapPin />
              <div className="text-[#555555] text-sm">
                {eventLocation === "BKK" ? t("bangkok_th_label") : t("fukuoka_jp_label")}
              </div>
            </div>

            <div className="flex items-center gap-2 w-1/2">
              <CalendarDaysIcon />
              <div className="text-[#555555] text-sm">
                {reservedOn?.toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>

          {ticketAmount || statusId ? (
            <div className="flex items-center justify-between gap-6 mt-1">
              <div className="flex items-center gap-2 w-1/2">
                <Ticket />
                <div className="text-[#555555] text-sm">
                  {`${ticketAmount} ${t("ticket_available_label")}`}
                </div>
              </div>

              <div className="flex items-center gap-2 w-1/2">
                <Info />
                <div
                  className={`text-sm font-bold`}
                  style={{
                    color: statusColor,
                  }}
                >
                  {reserveStatus}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default WideEventCard;
