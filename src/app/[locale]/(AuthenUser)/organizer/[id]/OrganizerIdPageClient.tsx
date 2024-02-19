import { Organizer } from "@/app/types/organizer";
import { FC } from "react";

interface OrganizerIdPageClientProps {
  organizer: Organizer;
}

const OrganizerIdPageClient: FC<OrganizerIdPageClientProps> = ({ organizer }) => {
  return <div>OrganizerIdPageClient</div>;
};

export default OrganizerIdPageClient;
