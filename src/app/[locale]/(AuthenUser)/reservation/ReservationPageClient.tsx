"use client";

import { NavbarContext } from "@/contexts/NavbarContext";
import { useRouter } from "@/navigation";
import { DatePicker, DatePickerProps, Empty, Select, Skeleton, Tabs, TabsProps } from "antd";
import { SearchProps } from "antd/es/input";
import dayjs from "dayjs";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";
import WideEventCard from "./WideEventCard";
import { AuthContext } from "@/contexts/AuthContext";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/app/config/firebaseConfig";
import { Reservation } from "@/app/types/reservation";
import { Event } from "@/app/types/event";
import { Organizer } from "@/app/types/organizer";
import { set } from "firebase/database";

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

  const [userReservations, setUserReservations] = useState<Reservation[]>([]);
  const [userEventByStatus, setUserEventByStatus] = useState<Reservation[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const onTabChange = (key: string) => {
    setCurrentTab(key);
    setUserEventByStatus(
      eventLocation
        ? userReservations.filter(
            (e) =>
              e.user_id === authContext.currentUser?.id &&
              e.status_id === Number(key) &&
              e.event?.country === eventLocation
          )
        : userReservations.filter(
            (e) => e.user_id === authContext.currentUser?.id && e.status_id === Number(key)
          )
    );
  };

  const items: TabsProps["items"] = [
    { key: "0", label: t("reserved_label"), children: <></> },
    { key: "1", label: t("past_event_label"), children: <></> },
    { key: "2", label: t("canceled_label"), children: <></> },
  ];

  const promiseAll = async (obj: any) => {
    if (obj && typeof obj.then == "function") obj = await obj;
    if (!obj || typeof obj != "object") return obj;
    const forWaiting: any = [];
    Object.keys(obj).forEach((k) => {
      if (obj[k] && typeof obj[k].then == "function")
        forWaiting.push(obj[k].then((res: any) => (obj[k] = res)));
      if (obj[k] && typeof obj[k] == "object") forWaiting.push(promiseAll(obj[k]));
    });
    await Promise.all(forWaiting);
    return obj;
  };

  useEffect(() => {
    navbarContext.setNavbarTitle(t("my_reservations_label"));

    async function getEventDataById(eventId: string) {
      // Get event data
      const eventRef = doc(db, "events", eventId);
      const eventDocSnap = await getDoc(eventRef);

      // Get organizer data
      const organizerRef = doc(db, "organizers", eventDocSnap.data()!.organizer_id);
      const organizerDocSnap = await getDoc(organizerRef);

      // Convert firebase object to event data object.
      const event = eventDocSnap.data() as Event;
      const organizer = organizerDocSnap.data() as Organizer;
      event.organizer = organizer;

      return {
        ...event,
        id: eventDocSnap.id,
        start_date: new Date(eventDocSnap.data()!.start_date.toDate()),
        end_date: new Date(eventDocSnap.data()!.end_date.toDate()),
      } as Event;
    }

    const fetchTest = async () => {
      const reservationRef = collection(db, "reservations");
      const q = query(reservationRef, where("user_id", "==", authContext.currentUser?.id));
      const querySnapshot = await getDocs(q);

      const reservations: any[] = [];

      querySnapshot.forEach((doc) => {
        const reservation = {
          ...doc.data(),
          id: doc.id,
          reserve_on: new Date(doc.data().reserve_on),
          event: getEventDataById(doc.data().event_id),
        };

        reservations.push(reservation);
      });

      promiseAll(reservations).then((res) => {
        setUserReservations(
          res.sort(
            (a: Reservation, b: Reservation) => b.reserve_on.getTime() - a.reserve_on.getTime()
          )
        );
        setUserEventByStatus(res.filter((e: any) => e.status_id == 0));
        setIsLoading(false);
      });
    };

    fetchTest();
  }, [authContext.currentUser, navbarContext]);

  if (isLoading)
    return (
      <div className="mt-6">
        <Skeleton active loading />
      </div>
    );

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
                    userReservations.filter(
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
        {userEventByStatus && userEventByStatus.length > 0 ? (
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
              onClick={() => router.push("/reservation/" + reservation.id)}
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
