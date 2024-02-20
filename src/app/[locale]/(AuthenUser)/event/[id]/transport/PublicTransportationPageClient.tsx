"use client";

import GoogleMap from "@/components/GoogleMap";
import { NavbarContext } from "@/contexts/NavbarContext";
import { EVENTS } from "@/mock/events";
import { usePathname } from "@/navigation";
import { Bus, CarTaxiFront, MapIcon, Ship, TrainFront } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect } from "react";

const PublicTransportationPageClient = () => {
  const pathname = usePathname();
  const navbarContext = useContext(NavbarContext);

  const t = useTranslations("Index");
  const eventId = pathname.split("/")[2];

  const event = EVENTS.filter((e) => e.id === eventId)[0];

  useEffect(() => {
    navbarContext.setNavbarTitle(t("public_transportation_label"));
  }, [navbarContext, t]);

  return (
    <div>
      <div>
        <GoogleMap address={event.loc_name} />
      </div>
      <div
        className="flex flex-row items-center justify-center w-full text-[#0068B2] gap-2 mt-6 active:bg-slate-100 rounded-xl"
        onClick={() => {
          window.open(
            `https://www.google.com/maps/search/${event.loc_name}`,
            "_blank",
            "noreferrer"
          );
        }}
      >
        <MapIcon />
        <div className="font-semibold">{t("open_on_google_maps_label")}</div>
      </div>

      <div className="mt-6 text-pretty leading-normal">{event.loc_address}</div>

      <div className="w-full shadow border mt-6 rounded-xl p-4 flex flex-col gap-4">
        {event.trans_bus && (
          <div className="flex flex-row gap-2">
            <Bus />
            <div>
              <div className="font-semibold text-[#0068B2]">{"Bus"}</div>
              <div className="mt-1 text-sm">{event.trans_bus}</div>
            </div>
          </div>
        )}
        {event.trans_train && (
          <div className="flex flex-row gap-2">
            <TrainFront />
            <div>
              <div className="font-semibold text-[#0068B2]">{"Train"}</div>
              <div className="mt-1 text-sm">{event.trans_train}</div>
            </div>
          </div>
        )}
        {event.trans_boat && (
          <div className="flex flex-row gap-2">
            <Ship />
            <div>
              <div className="font-semibold text-[#0068B2]">{"Boat"}</div>
              <div className="mt-1 text-sm">{event.trans_boat}</div>
            </div>
          </div>
        )}
        {event.trans_taxi && (
          <div className="flex flex-row gap-2">
            <CarTaxiFront />
            <div>
              <div className="font-semibold text-[#0068B2]">{"Taxi"}</div>
              <div className="mt-1 text-sm">{event.trans_taxi}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PublicTransportationPageClient;
