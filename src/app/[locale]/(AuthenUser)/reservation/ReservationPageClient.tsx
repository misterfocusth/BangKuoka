"use client";

import { NavbarContext } from "@/contexts/NavbarContext";
import { useRouter } from "@/navigation";
import { DatePicker, DatePickerProps, Empty, Select, Tabs, TabsProps } from "antd";
import { SearchProps } from "antd/es/input";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";
import { RESERVATIONS } from "@/mock/reservations";
import WideEventCard from "./WideEventCard";
import { AuthContext } from "@/contexts/AuthContext";

const dateFormat = "DD MMMM YYYY";

const ReservationPageClient = () => {
  const router = useRouter();
  const t = useTranslations("Index");

  const authContext = useContext(AuthContext);
  const navbarContext = useContext(NavbarContext);

  const [eventLocation, setEventLocation] = useState<string>("");
  const [currentTab, setCurrentTab] = useState("0");

  const onEventDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    console.log(typeof date, typeof dateString);
  };

  const [userEventByStatus, setUserEventByStatus] = useState(
    RESERVATIONS.filter((e) => e.user_id === authContext.currentUser?.id && e.status_id === 0)
  );

  const onTabChange = (key: string) => {
    setCurrentTab(key);
    setUserEventByStatus(
      eventLocation
        ? RESERVATIONS.filter(
            (e) =>
              e.user_id === authContext.currentUser?.id &&
              e.status_id === Number(key) &&
              e.event?.country === eventLocation
          )
        : RESERVATIONS.filter(
            (e) => e.user_id === authContext.currentUser?.id && e.status_id === Number(key)
          )
    );
  };

  const items: TabsProps["items"] = [
    { key: "0", label: t("reserved_label"), children: <></> },
    { key: "1", label: t("past_event_label"), children: <></> },
    { key: "2", label: t("canceled_label"), children: <></> },
  ];

  useEffect(() => {
    navbarContext.setNavbarTitle(t("my_reservations_label"));
  }, [navbarContext]);

  return (
    <div className="mb-32">
      <div className="text-lg font-bold">{t("my_reservation_title")}</div>
      <div className="text-[#555555] mt-1">{t("my_reservation_subtitle")}</div>

      <div className="mt-6">
        <div className="mt-4 flex items-center gap-4">
          <div className="w-full">
            <div className="font-semibold text-sm">{t("location_label")}</div>
            <Select
              defaultValue=""
              className="w-full h-10 mt-2"
              size="large"
              onChange={(value: string) => {
                if (value) {
                  setUserEventByStatus(
                    RESERVATIONS.filter(
                      (e) =>
                        e.user_id === authContext.currentUser?.id &&
                        e.status_id === Number(currentTab) &&
                        e.event?.country === value
                    )
                  );
                }
                setEventLocation(value);
              }}
              value={eventLocation}
              options={[
                { value: "BKK", label: "Bangkok" },
                { value: "FK", label: "Fukuoka" },
              ]}
            />
          </div>

          <div className="w-full">
            <div className="font-semibold text-sm">{t("date_label")}</div>
            <DatePicker
              // defaultValue={dayjs("18 December 2003", dateFormat)}
              format={dateFormat}
              className="w-full h-10 mt-2"
              onChange={onEventDateChange}
            />
          </div>
        </div>

        <Tabs
          className="mt-4"
          defaultActiveKey="0"
          centered
          items={items}
          onChange={onTabChange}
        ></Tabs>
      </div>

      <div>
        {userEventByStatus.length > 0 ? (
          userEventByStatus.map((reservation) => (
            <WideEventCard
              key={reservation.id}
              id={reservation.id}
              eventImageSrc={reservation.event?.event_image_src || ""}
              eventName={reservation.event?.event_name || ""}
              description={reservation.event?.description || ""}
              reservedOn={reservation.reserve_on}
              ticketAmount={reservation.ticket_amount}
              statusId={reservation.status_id}
              categoryId={reservation.event?.category_id || 0}
              eventLocation={reservation.event?.country || ""}
            />
          ))
        ) : (
          <Empty className="mt-12" />
        )}
      </div>
    </div>
  );
};

export default ReservationPageClient;
