"use client";

import { Event } from "@/app/types/event";
import { Badge, BadgeProps, Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect, useState } from "react";

import "./style.css";
import { EVENTS } from "@/mock/events";
import { AuthContext } from "@/contexts/AuthContext";
import { Organizer } from "@/app/types/organizer";
import { CalendarDaysIcon } from "lucide-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/config/firebaseConfig";

const getListData = (value: Dayjs, events: Event[] | null) => {
  let listData;

  listData = events
    ?.filter(
      (e) =>
        dayjs(e.start_date).date() === value.date() && dayjs(e.start_date).month() === value.month()
    )
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    .map((e) => ({ type: "processing", content: e.event_name }));
  return listData || [];
};

const CalendarPage = () => {
  const currentUser = useContext(AuthContext).currentUser as Organizer;
  const [events, setEvents] = useState<Event[] | null>(null);

  const getEvents = async () => {
    const eventRef = collection(db, "events");
    const q = query(eventRef, where("organizer_id", "==", currentUser?.id));
    const querySnapshot = await getDocs(q);

    let events: Event[] = [];
    for (let event of querySnapshot.docs) {
      events.push({
        ...event.data(),
        id: event.id,
        start_date: new Date(event.data().start_date.toDate()),
        end_date: new Date(event.data().end_date.toDate()),
        organizer: currentUser,
      } as Event);
    }

    setEvents(events);
  };

  useEffect(() => {
    getEvents();
  }, [currentUser]);

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value, events);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type as BadgeProps["status"]} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    // if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  return (
    <div>
      <div className="flex flex-row items-center gap-2 text-xl font-bold mb-6">
        <CalendarDaysIcon />
        Your event calendar
      </div>
      <Calendar cellRender={cellRender} />
    </div>
  );
};

export default CalendarPage;
