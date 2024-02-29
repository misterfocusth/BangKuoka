import { RESERVATIONS } from "@/mock/reservations";
import React from "react";
import ReservationIdPageClient from "./ReservationIdPageClient";

interface EventIdPageParams {
  id: string;
}

const ReservationIdPage = ({ params }: { params: EventIdPageParams }) => {
  return <ReservationIdPageClient reservationId={params.id} />;
};

export default ReservationIdPage;
