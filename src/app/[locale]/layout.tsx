"use client";

import "../globals.css";

// Antd
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <head>
        <title>BangKuoka</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body id="app">
        <AntdRegistry>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#136912",
                colorInfo: "#136912",
                borderRadius: 12,
                colorPrimaryBg: "#1677ff00",
              },
            }}
          >
            {children}
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
