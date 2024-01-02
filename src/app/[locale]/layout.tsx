import "../globals.css";

// Antd
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale} suppressHydrationWarning>
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
                fontFamily: "Noto Sans",
              },
            }}
          >
            <NextIntlClientProvider locale={locale} messages={useMessages()}>
              {children}
            </NextIntlClientProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
