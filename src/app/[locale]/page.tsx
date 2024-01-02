"use client";

import { Button, ConfigProvider } from "antd";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations("Index");

  return (
    <ConfigProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <p>{t("login_suggest_label")}</p>
        <Button className="w-full font-bold" size="large" type="primary">
          {t("login_button_title")}
        </Button>
        <Button className="w-full font-bold" size="large" type="default">
          Cancel
        </Button>
      </main>
    </ConfigProvider>
  );
}
