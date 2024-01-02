"use client";

export default function Home() {
  if (window !== undefined) {
    window.location.href = "/en/login";
  }

  return <></>;
}
