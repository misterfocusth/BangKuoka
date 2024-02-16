import React, { useContext } from "react";
import ReservationPageClient from "./ReservationPageClient";
import { EVENTS } from "@/mock/events";
import { RESERVATIONS } from "@/mock/reservations";
import { AuthContext } from "@/contexts/AuthContext";

const ReservationPage = () => {
  return <ReservationPageClient />;
};

export default ReservationPage;
