import { ORGANIZERS } from "@/mock/organizers";
import React from "react";
import OrganizerIdPageClient from "./OrganizerIdPageClient";

interface EventIdPageParams {
  id: string;
}

const OrganizerIdPage = ({ params }: { params: EventIdPageParams }) => {
  const organizerId = params.id;
  const organizer = ORGANIZERS.find((o) => o.id === organizerId)!;

  return <OrganizerIdPageClient organizer={organizer} />;
};

export default OrganizerIdPage;
