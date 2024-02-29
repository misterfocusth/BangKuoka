"use client";

import { db } from "@/app/config/firebaseConfig";
import { Event } from "@/app/types/event";
import EventCard from "@/components/card/EventCard";
import OrganizerCard from "@/components/card/OrganizerCard";
import { AuthContext } from "@/contexts/AuthContext";
import { NavbarContext } from "@/contexts/NavbarContext";
import { ORGANIZERS } from "@/mock/organizers";
import { useRouter } from "@/navigation";
import { Avatar, Button, Card, DatePicker, DatePickerProps, Empty, Select, message } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import dayjs from "dayjs";
import { collection, getDocs, query, where } from "firebase/firestore";
import { MapPin, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useContext, useEffect, useMemo, useState } from "react";

const dateFormat = "DD MMMM YYYY";

const HomePage = () => {
  const t = useTranslations("Index");
  const router = useRouter();
  const authContext = useContext(AuthContext);

  const navbarContext = useContext(NavbarContext);

  const [eventLocation, setEventLocation] = useState<String>("All");
  const [events, setEvents] = useState<Event[] | null>(null);
  const [filteredEvents, setFilteredEvents] = useState<Event[] | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    setSearchValue(value);
    console.log(events);
    const location = eventLocation === "Bangkok" ? "BKK" : "FK";
    if (!value && eventLocation === "All") {
      setFilteredEvents(events);
    } else if (value && eventLocation === "All") {
      setFilteredEvents(
        events && events.length > 0
          ? events.filter((e) => e.event_name.toLowerCase().includes(value))
          : []
      );
    } else {
      setFilteredEvents(
        events && events.length > 0
          ? events.filter(
              (e) => e.event_name.toLowerCase().includes(value) && e.country === location
            )
          : []
      );
    }
  };

  const onEventDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    console.log(typeof date, typeof dateString);
  };

  const fetchAllEvents = async () => {
    const eventRef = collection(db, "events");
    const q = query(eventRef);
    const queryResult = await getDocs(q);

    const events: Event[] = [];

    queryResult.forEach((doc) => {
      const event: Event = {
        ...doc.data(),
        end_date: new Date(doc.data().end_date.toDate()),
        start_date: new Date(doc.data().start_date.toDate()),
        id: doc.id,
      } as Event;

      if (event.end_date.getTime() > Date.now()) {
        events.push(event);
      }
    });

    setEvents(events);
    setFilteredEvents(events);
  };

  useEffect(() => {
    navbarContext.setNavbarTitle("BangKuoka");
    fetchAllEvents();
  }, [navbarContext]);

  return (
    <div className="mb-32">
      <div className="flex items-center justify-between ">
        <div>
          <p className="text-xl font-bold m-0">{t("explore_world_label")}</p>
          <div className="flex items-center gap-1 mt-3">
            <MapPin />
            <p className="m-0 text-[#555555]">
              {t("your_location_label")}{" "}
              {Intl.DateTimeFormat().resolvedOptions().timeZone === "Asia/Bangkok"
                ? "Bangkok"
                : "Japan"}
            </p>
          </div>
        </div>

        <div className="rounded-full w-fit" onClick={() => router.push("/profile")}>
          <Image
            src={"/images/landing/flight 1.png"}
            width={1920}
            height={1080}
            className=" w-20 h-20"
            alt="image"
          />
        </div>
      </div>

      {/* <Card bordered className="p-0">
        <div className="font-semibold">{t("search_by_event_name_label")}</div>
        <Search
          placeholder={t("search_event_placeholder")}
          onSearch={onSearch}
          size="large"
          className="mt-3"
        />

        <div className="mt-4 flex items-center gap-4">
          <div className="w-full">
            <div className="font-semibold">{t("location_label")}</div>
            <Select
              defaultValue="TH"
              className="w-full h-12 mt-2"
              size="large"
              onChange={setEventLocation}
              value={eventLocation}
              options={[
                { value: "Bangkok", label: "Bangkok" },
                { value: "Fukuoka", label: "Fukuoka" },
              ]}
            />
          </div>

          <div className="w-full">
            <div className="font-semibold">{t("date_label")}</div>
            <DatePicker
              defaultValue={dayjs("18 December 2003", dateFormat)}
              format={dateFormat}
              className="w-full h-12 mt-2"
              onChange={onEventDateChange}
            />
          </div>
        </div>
      </Card> */}

      <div className="w-full shadow border mt-6 p-4 rounded-xl">
        <div className="font-semibold text-sm">{t("search_by_event_name_label")}</div>
        <Search
          placeholder={t("search_event_placeholder")}
          onSearch={onSearch}
          size="large"
          className="mt-2"
        />

        <div className="mt-4 flex items-center gap-4">
          <div className="w-full">
            <div className="font-semibold text-sm">{t("location_label")}</div>
            <Select
              defaultValue="TH"
              className="w-full h-10 mt-2"
              size="large"
              onChange={(value) => {
                setEventLocation(value);
                const location = value == "Bangkok" ? "BKK" : "FK";
                if (value === "All" && !searchValue) {
                  return setFilteredEvents(events);
                } else if (value !== "All" && !searchValue) {
                  return setFilteredEvents(
                    events ? events.filter((e) => e.country == location) : []
                  );
                } else if (value === "All" && searchValue) {
                  return setFilteredEvents(
                    events
                      ? events.filter((e) => e.event_name.toLowerCase().includes(searchValue))
                      : []
                  );
                } else {
                  return setFilteredEvents(
                    events
                      ? events.filter(
                          (e) =>
                            e.country == location &&
                            e.event_name.toLowerCase().includes(searchValue)
                        )
                      : []
                  );
                }
              }}
              value={eventLocation}
              options={[
                { value: "All", label: "Show all events" },
                { value: "Bangkok", label: "Bangkok" },
                { value: "Fukuoka", label: "Fukuoka" },
              ]}
            />
          </div>

          <div className="w-full">
            <div className="font-semibold text-sm">{t("date_label")}</div>
            <DatePicker
              // defaultValue={dayjs("18 December 2003", dateFormat)}
              format={dateFormat}
              className="w-full h-10 mt-2"
              onChange={onEventDateChange}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-lg font-bold">{t("popular_events_label")}</div>
        {/* <Button
          type="text"
          className="text-[#136912] active:bg-slate-100"
          onClick={() => {
            router.push("/events");
          }}
        >
          {t("view_more_label")}
        </Button> */}
      </div>
      <div className="text-[#555555] mt-1">{t("local_events_subtitle")}</div>

      <div className="grid grid-cols-2 gap-4">
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents
            .sort((a, b) => b.participant_num - a.participant_num)
            .map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                eventImageSrc={event.event_image_src}
                eventName={event.event_name}
                description={(event.description && event.description.substring(0, 50)) || ""}
                startDate={event.start_date}
                categoryId={event.category_id}
              />
            ))
        ) : (
          <Empty className="mt-6 mx-auto" />
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-lg font-bold">{t("more_event_label")}</div>
        {/* <Button
          type="text"
          className="text-[#136912] active:bg-slate-100"
          onClick={() => {
            router.push("/events");
          }}
          disabled
        >
          {t("view_more_label")}
        </Button> */}
      </div>
      <div className="text-[#555555] mt-1">{t("more_event_subtitle")}</div>

      <div className="grid grid-cols-2 gap-4">
        {filteredEvents && filteredEvents.length > 0 ? (
          filteredEvents
            .sort((a, b) => b.start_date.getTime() - a.start_date.getTime())
            .map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                eventImageSrc={event.event_image_src}
                eventName={event.event_name}
                description={event.description ? event.description.substring(0, 50) : ""}
                startDate={event.start_date}
                categoryId={event.category_id}
              />
            ))
        ) : (
          <Empty className="mt-6 mx-auto" />
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-lg font-bold">{t("event_organizers_label")}</div>
        <Button
          type="text"
          className="text-[#136912] active:bg-slate-100"
          onClick={() => {
            router.push("/organizers");
          }}
        >
          {t("view_more_label")}
        </Button>
      </div>
      <div className="text-[#555555] mt-1">{t("event_organizers_subtitle")}</div>

      <div className="grid grid-cols-2 gap-4">
        {ORGANIZERS.length > 0 ? (
          ORGANIZERS.map((organizer) => {
            return (
              <OrganizerCard
                key={organizer.id}
                id={organizer.id}
                name={organizer.name}
                imageSrc={organizer.icon_image_src}
              />
            );
          })
        ) : (
          <Empty className="mt-6 mx-auto" />
        )}
      </div>
    </div>
  );
};

export default HomePage;
