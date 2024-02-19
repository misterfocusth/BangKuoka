"use client";

import { Organizer } from "@/app/types/organizer";
import GoogleMap from "@/components/GoogleMap";
import EventCard from "@/components/card/EventCard";
import { NavbarContext } from "@/contexts/NavbarContext";
import { EVENTS } from "@/mock/events";
import { Empty, Select } from "antd";
import { Globe2, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FC, useContext, useEffect, useState } from "react";

interface OrganizerIdPageClientProps {
  organizer: Organizer;
}

const OrganizerIdPageClient: FC<OrganizerIdPageClientProps> = ({ organizer }) => {
  const navbarContext = useContext(NavbarContext);
  const t = useTranslations("Index");
  const [eventType, setEventType] = useState("0");
  const originalEvents = EVENTS.filter((e) => e.organizer_id === organizer.id);
  const [events, setEvents] = useState(originalEvents);

  useEffect(() => {
    navbarContext.setNavbarTitle(t("organizer_profile_label"));
  }, [t, navbarContext]);
  return (
    <div className="mb-32">
      <div className="w-full shadow rounded-xl p-4">
        <div>
          <div className="flex flex-row items-center gap-4">
            <Image
              src={organizer.icon_image_src}
              width="1920"
              height="1080"
              alt="organizer"
              className="w-20 h-20"
            />
            <div>
              <div className="font-semibold">{organizer.name}</div>
              <div className="flex flex-row items-center gap-1 mt-2">
                <MapPin />
                <div className="text-sm">
                  {organizer.country === "TH" ? t("bangkok_th_label") : t("fukuoka_jp_label")}
                </div>
              </div>
            </div>
          </div>

          <div className="text-[#555555] text-sm text-wrap mt-3">{organizer.description}</div>
        </div>
      </div>

      <div className="text-lg font-bold mt-6">{t("contact_info_title")}</div>
      <div className="text-[#555555] mt-1">{t("contact_info_subtitle")}</div>

      <div className="mt-6">
        <GoogleMap address={organizer.address} />
      </div>
      <div className=" leading-normal mt-6">{organizer.address}</div>

      <div className="mt-6 flex flex-col gap-4">
        {organizer.email && (
          <div className="flex items-start gap-3">
            <Mail color="#0068B2" />
            <div>
              <div className="text-[#0068B2] font-semibold">{t("email_label")}</div>
              <div className="mt-1 text-sm">{organizer.email}</div>
            </div>
          </div>
        )}

        {organizer.phone_number && (
          <div className="flex items-start gap-3">
            <Phone color="#0068B2" />
            <div>
              <div className="text-[#0068B2] font-semibold">{t("phone_number")}</div>
              <div className="mt-1 text-sm">{organizer.phone_number}</div>
            </div>
          </div>
        )}

        {organizer.website && (
          <div className="flex items-start gap-3">
            <Globe2 color="#0068B2" />
            <div>
              <div className="text-[#0068B2] font-semibold">{t("website_label")}</div>
              <div
                className="mt-1 text-sm underline"
                onClick={() => {
                  window.open(organizer.website, "_blank", "noreferrer");
                }}
              >
                {organizer.website}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="text-lg font-bold mt-6">{t("events_title")}</div>
      <div className="text-[#555555] mt-1">{t("events_subtitle")}</div>

      <div>
        <Select
          className="w-full h-12 mt-6"
          size="large"
          onChange={(value) => {
            if (value === "0") {
              setEvents(originalEvents);
            } else if (value === "1") {
              setEvents(
                originalEvents.filter(
                  (e) => new Date(e.start_date).getTime() >= new Date().getTime()
                )
              );
            } else if (value === "2") {
              setEvents(
                originalEvents.filter(
                  (e) => new Date(e.start_date).getTime() < new Date().getTime()
                )
              );
            }

            setEventType(value);
          }}
          value={eventType}
          options={[
            { value: "0", label: "All events" },
            { value: "1", label: "Active events" },
            { value: "2", label: "Past events" },
          ]}
        />
      </div>

      <div className="flex items-center gap-4">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              eventImageSrc={event.event_image_src}
              eventName={event.event_name}
              description={event.description.substring(0, 50)}
              startDate={event.start_date}
              categoryId={event.category_id}
            />
          ))
        ) : (
          <Empty className="mx-auto mt-8" />
        )}
      </div>
    </div>
  );
};

export default OrganizerIdPageClient;
