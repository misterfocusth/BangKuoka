import { ORGANIZERS } from "@/mock/organizers";
import React from "react";
import OrganizersPageClient from "./OrganizersPageClient";

const OrganizersPage = () => {
  return <OrganizersPageClient organizers={ORGANIZERS} />;
};

export default OrganizersPage;
