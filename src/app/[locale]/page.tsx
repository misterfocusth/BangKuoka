"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  if (window !== undefined) {
    window.location.href = "/en/login";
  }

  return <></>;
}
