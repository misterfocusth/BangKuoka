"use client";

import { useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const SavedEventPageClient = () => {
  const router = useRouter();
  const t = useTranslations("Index");

  return (
    <div className="mb-32">
      <div className="text-lg font-bold">{t("my_saved_events_label")}</div>
      <div className="text-[#555555] mt-1">{t("saved_events_subtitle")}</div>
    </div>
  );
};

export default SavedEventPageClient;
