"use client";

import { db } from "@/app/config/firebaseConfig";
import { Event } from "@/app/types/event";
import { Organizer } from "@/app/types/organizer";
import GoogleMap from "@/components/GoogleMap";
import { NavbarContext } from "@/contexts/NavbarContext";
import { EVENTS } from "@/mock/events";
import { usePathname } from "@/navigation";
import { Skeleton } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { Bus, CarTaxiFront, MapIcon, Ship, TrainFront } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";

const PublicTransportationPageClient = () => {
  const pathname = usePathname();
  const navbarContext = useContext(NavbarContext);

  const t = useTranslations("Index");
  const eventId = pathname.split("/")[2];

  const [eventData, setEventData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Get event data
      const eventRef = doc(db, "events", eventId);
      const eventDocSnap = await getDoc(eventRef);

      // Get organizer data
      const organizerRef = doc(db, "organizers", eventDocSnap.data()!.organizer_id);
      const organizerDocSnap = await getDoc(organizerRef);

      // Convert firebase object to event data object.
      const event = eventDocSnap.data() as Event;
      const organizer = organizerDocSnap.data() as Organizer;
      event.organizer = organizer;

      const eventData: Event = {
        ...event,
        id: eventDocSnap.id,
        start_date: new Date(eventDocSnap.data()!.start_date.toDate()),
        end_date: new Date(eventDocSnap.data()!.end_date.toDate()),
      };

      setIsLoading(false);
      setEventData(eventData);

      navbarContext.setNavbarTitle(t("public_transportation_label"));
    }

    fetchData();
  }, [eventId]);

  if (!eventData || isLoading) {
    return (
      <div className="mt-6">
        <Skeleton active loading />
      </div>
    );
  }

  return (
    <div>
      <div>
        <GoogleMap address={eventData.loc_name} />
      </div>
      <div
        className="flex flex-row items-center justify-center w-full text-[#0068B2] gap-2 mt-6 active:bg-slate-100 rounded-xl"
        onClick={() => {
          window.open(
            `https://www.google.com/maps/search/${eventData.loc_name}`,
            "_blank",
            "noreferrer"
          );
        }}
      >
        <MapIcon />
        <div className="font-semibold">{t("open_on_google_maps_label")}</div>
      </div>

      <div className="mt-6 text-pretty leading-normal">{eventData.loc_address}</div>

      <div className="w-full shadow border mt-6 rounded-xl p-4 flex flex-col gap-4">
        {eventData.trans_bus && (
          <div className="flex flex-row gap-2">
            <Bus />
            <div>
              <div className="font-semibold text-[#0068B2]">{"Bus"}</div>
              <div className="mt-1 text-sm">{eventData.trans_bus}</div>
            </div>
          </div>
        )}
        {eventData.trans_train && (
          <div className="flex flex-row gap-2">
            <TrainFront />
            <div>
              <div className="font-semibold text-[#0068B2]">{"Train"}</div>
              <div className="mt-1 text-sm">{eventData.trans_train}</div>
            </div>
          </div>
        )}
        {eventData.trans_boat && (
          <div className="flex flex-row gap-2">
            <Ship />
            <div>
              <div className="font-semibold text-[#0068B2]">{"Boat"}</div>
              <div className="mt-1 text-sm">{eventData.trans_boat}</div>
            </div>
          </div>
        )}
        {eventData.trans_taxi && (
          <div className="flex flex-row gap-2">
            <CarTaxiFront />
            <div>
              <div className="font-semibold text-[#0068B2]">{"Taxi"}</div>
              <div className="mt-1 text-sm">{eventData.trans_taxi}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicTransportationPageClient;
