"use client";

import { NavbarContext } from "@/contexts/NavbarContext";
import { EVENTS } from "@/mock/events";
import { usePathname } from "@/navigation";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect } from "react";

const PublicTransportationPageClient = () => {
  const pathname = usePathname();
  const navbarContext = useContext(NavbarContext);

  const t = useTranslations("Index");
  const eventId = pathname.split("/")[2];

  const event = EVENTS.filter((e) => e.id === eventId);

  useEffect(() => {
    navbarContext.setNavbarTitle(t("public_transportation_label"));
  }, [navbarContext, t]);

  return <div>{eventId}</div>;
};

export default PublicTransportationPageClient;
