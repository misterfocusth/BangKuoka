import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ja", "th"],
  defaultLocale: "en",
});

export const config = {
  matcher: ["/", "/(en|ja|th)/:path*"],
};
