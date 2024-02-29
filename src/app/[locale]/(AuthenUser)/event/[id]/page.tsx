import React from "react";
import EventIdPageClient from "./EventIdPageClient";
import { EVENTS } from "@/mock/events";
import { Event } from "@/app/types/event";

interface EventIdPageParams {
  id: string;
}

const EventIdPage = ({ params }: { params: EventIdPageParams }) => {
  const eventData: Event = EVENTS.filter((e) => e.id === params.id)[0];
  console.log(eventData);

  return <EventIdPageClient eventId={params.id} />;
};

export default EventIdPage;
