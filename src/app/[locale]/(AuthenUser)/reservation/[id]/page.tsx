import { RESERVATIONS } from "@/mock/reservations";
import React from "react";
import ReservationIdPageClient from "./ReservationIdPageClient";

interface EventIdPageParams {
  id: string;
}

const ReservationIdPage = ({ params }: { params: EventIdPageParams }) => {
  const eventId = params.id;
  const reservation = RESERVATIONS.find((e) => e.id === eventId)!;
  return <ReservationIdPageClient reservation={reservation} />;
};

export default ReservationIdPage;
