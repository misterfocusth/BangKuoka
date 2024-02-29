import { ORGANIZERS } from "@/mock/organizers";
import React from "react";
import OrganizerIdPageClient from "./OrganizerIdPageClient";

interface EventIdPageParams {
  id: string;
}

const OrganizerIdPage = ({ params }: { params: EventIdPageParams }) => {
  const organizerId = params.id;

  return <OrganizerIdPageClient organizerId={organizerId} />;
};

export default OrganizerIdPage;
