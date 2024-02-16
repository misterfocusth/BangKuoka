"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { EVENTS } from "@/mock/events";
import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import React, { useContext } from "react";
import WideEventCard from "../reservation/WideEventCard";
import { Event } from "@/app/types/event";

const SavedEventPageClient = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();
  const t = useTranslations("Index");

  const userSavedEvents: Event[] = EVENTS.filter((e) => currentUser?.saved_events?.includes(e.id));
  console.log(currentUser?.saved_events?.includes("1"));
  console.log(currentUser?.saved_events?.includes("2"));

  return (
    <div className="mb-32">
      <div className="text-lg font-bold">{t("my_saved_events_label")}</div>
      <div className="text-[#555555] mt-1">{t("saved_events_subtitle")}</div>

      {userSavedEvents.map((event) => (
        <WideEventCard
          key={event.id}
          id={event.id}
          eventImageSrc={event.event_image_src || ""}
          eventName={event.event_name || ""}
          description={event.description || ""}
          categoryId={event.category_id || 0}
          eventLocation={event.country || ""}
          reservedOn={event.start_date}
        />
      ))}
    </div>
  );
};

export default SavedEventPageClient;
