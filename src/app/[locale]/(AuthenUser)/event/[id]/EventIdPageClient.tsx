"use client";

import { Event } from "@/app/types/event";
import SaveEventButton from "@/components/button/SaveEventButton";
import EventCategoryChip from "@/components/chip/EventCategoryChip";
import { AuthContext, Session } from "@/contexts/AuthContext";
import { NavbarContext } from "@/contexts/NavbarContext";
import { useRouter } from "@/navigation";
import { Button } from "antd";
import {
  Bus,
  CalendarDays,
  CarTaxiFront,
  ChevronRight,
  MapPinned,
  Ship,
  TrainFront,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useContext } from "react";
import toast from "react-hot-toast";

interface EventIdPageClientProps {
  eventId: string;
  eventData: Event;
}

const EventIdPageClient: React.FC<EventIdPageClientProps> = ({ eventId, eventData }) => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser as Session;
  const isUserSaveEvent = currentUser?.saved_events?.some((e) => e === eventId);

  const router = useRouter();
  const t = useTranslations("Index");
  const navbarContext = useContext(NavbarContext);
  navbarContext.setNavbarTitle(eventData.event_name);

  const handleMakeReservation = () => {
    if (confirm()) {
      toast.success("Make reservation complete.");
      router.push("/reservation/" + "1");
    }
  };

  return (
    <div className="mb-20">
      <div className="relative">
        <Image
          src={eventData.event_image_src}
          width={1920}
          height={1080}
          className="w-full h-full rounded-xl"
          alt="event image"
        />
        <div className=" absolute top-0 right-0">
          <SaveEventButton isUserSaveEvent={isUserSaveEvent} />
        </div>
        <div className="absolute bottom-0 m-3">
          <EventCategoryChip categoryId={eventData.category_id + ""} />
        </div>
      </div>

      <div className="mt-6 text-lg font-bold">{eventData.event_name}</div>

      <div className="w-full shadow border mt-6 rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <CalendarDays />
          <div>
            <div className="text-[#0068B2] font-semibold">{t("event_date_label")}</div>
            <div className="mt-1 text-sm">{eventData.start_date + " - " + eventData.end_date}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPinned />
          <div className="w-4/5">
            <div className="text-[#0068B2] font-semibold">{t("location_label")}</div>
            <div className="mt-1 text-sm  text-wrap">{eventData.loc_address}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users />
          <div>
            <div className="text-[#0068B2] font-semibold">{t("participants_label")}</div>
            <div className="mt-1 text-sm text-wrap">
              {eventData.participant_num + " " + t("people_are_participated_in_this_event_label")}
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full shadow border mt-6 rounded-xl p-4 flex items-center justify-between active:bg-slate-100"
        onClick={() => router.push("/event/" + eventData.id + "/transport", { scroll: true })}
      >
        <div className="flex flex-row items-center gap-1.5">
          <Bus />
          <TrainFront />
          <Ship />
          <CarTaxiFront />
        </div>
        <div className="flex items-center gap-1">
          <div className="text-sm font-semibold text-[#0068B2]">
            {t("public_transportation_label")}
          </div>
          <ChevronRight />
        </div>
      </div>

      <div className="text-wrap leading-relaxed mt-6">{eventData.description}</div>

      <Button
        className="w-full font-bold mt-6 p-6 flex flex-row items-center justify-center"
        size="large"
        type="primary"
        onClick={handleMakeReservation}
      >
        {t("make_reservation_button_label")}
      </Button>

      <div className="w-full shadow border mt-6 rounded-xl p-4 flex flex-row gap-4 items-center">
        <Image
          src={eventData.organizer.icon_image_src}
          width={1920}
          height={1080}
          alt="organizer icon"
          className="w-16 h-16"
        />
        <div className="flex flex-col gap-2">
          <div className="font-semibold">{t("organized_by_label")}</div>
          <div className="text-wrap text-sm">{eventData.organizer.name}</div>
          <div
            className="text-[#0068B2] font-semibold text-sm active:bg-slate-100 rounded-xl"
            onClick={() => router.push("/organizer/" + eventData.organizer_id)}
          >
            {t("view_organizer_profile_label")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventIdPageClient;
