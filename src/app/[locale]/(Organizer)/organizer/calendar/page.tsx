"use client";

import { Event } from "@/app/types/event";
import { Badge, BadgeProps, Calendar, CalendarProps } from "antd";
import dayjs, { Dayjs } from "dayjs";
import React, { useContext, useEffect, useState } from "react";

import "./style.css";
import { EVENTS } from "@/mock/events";
import { AuthContext } from "@/contexts/AuthContext";
import { Organizer } from "@/app/types/organizer";

const getListData = (value: Dayjs, events: Event[] | null) => {
  let listData;

  console.log(dayjs(events![0].start_date).date());
  console.log(value.date());

  listData = events
    ?.filter(
      (e) =>
        dayjs(e.start_date).date() === value.date() && dayjs(e.start_date).month() === value.month()
    )
    .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime())
    .map((e) => ({ type: "processing", content: e.event_name }));

  console.log(listData);
  return listData || [];
};

const getMonthData = (value: Dayjs) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarPage = () => {
  const currentUser = useContext(AuthContext).currentUser as Organizer;
  const [events, setEvents] = useState<Event[] | null>(
    EVENTS.filter((e) => e.organizer_id == currentUser?.id || "")
  );

  useEffect(() => {
    setEvents(EVENTS.filter((e) => e.organizer_id == currentUser?.id || ""));
  }, [currentUser]);

  //   const monthCellRender = (value: Dayjs) => {
  //     const num = getMonthData(value);
  //     return num ? (
  //       <div className="notes-month">
  //         <section>{num}</section>
  //         <span>Backlog number</span>
  //       </div>
  //     ) : null;
  //   };

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
      <Calendar cellRender={cellRender} />
    </div>
  );
};

export default CalendarPage;
