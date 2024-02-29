"use client";

import { db } from "@/app/config/firebaseConfig";
import { Event } from "@/app/types/event";
import { Organizer } from "@/app/types/organizer";
import { Reservation } from "@/app/types/reservation";
import EventCategoryChip from "@/components/chip/EventCategoryChip";
import { NavbarContext } from "@/contexts/NavbarContext";
import { useRouter } from "@/navigation";
import { Button, Skeleton } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { get } from "http";
import {
  Bus,
  CalendarDays,
  CarTaxiFront,
  ChevronRight,
  CircleUserIcon,
  Mail,
  MapPinned,
  Phone,
  Ship,
  TrainFront,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface ReservationIdPageClientProps {
  reservationId: string;
}

const ReservationIdPageClient: React.FC<ReservationIdPageClientProps> = ({ reservationId }) => {
  const router = useRouter();
  const navbarContext = useContext(NavbarContext);
  const t = useTranslations("Index");

  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleCancelReservation = () => {
    if (confirm()) {
      toast.success("Your reservation has been cancel.");
      router.back();
    }
  };

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
    navbarContext.setNavbarTitle(t("my_reservation_info_label"));

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

    async function getUserDataById(userId: string) {
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
      const userData = docSnap.data();

      if (!userData) return;

      return {
        ...userData,
        id: docSnap.id,
      };
    }

    async function fetchData() {
      const docRef = doc(db, "reservations", reservationId);
      const docSnap = await getDoc(docRef);
      const reservationData = docSnap.data();

      if (!reservationData) return;

      const event = await getEventDataById(reservationData.event_id);
      const user = await getUserDataById(reservationData.user_id);

      const reservation = {
        ...reservationData,
        id: docSnap.id,
        reserve_on: new Date(reservationData.reserve_on),
        event: event,
        user: user,
      };

      console.log(reservation);

      setReservation(reservation as Reservation);
      setIsLoading(false);
    }

    fetchData();
  }, []);

  if (!reservation || !reservation.event || isLoading) {
    return (
      <div className="mt-6">
        <Skeleton active loading />
      </div>
    );
  }

  return (
    <div className="mb-32">
      <div className="relative">
        <Image
          src={reservation.event?.event_image_src || ""}
          width={1920}
          height={1080}
          className="w-full h-full rounded-xl"
          alt="event image"
        />
        <div className="absolute bottom-0 m-3">
          <EventCategoryChip categoryId={reservation.event?.category_id + ""} />
        </div>
      </div>

      <div className="mt-6 text-lg font-bold">{reservation.event?.event_name}</div>

      <div className="w-full shadow border mt-6 rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <CalendarDays />
          <div className="w-4/5">
            <div className="text-[#0068B2] font-semibold">{t("event_date_label")}</div>
            <div className="mt-1 text-sm">
              {reservation.event.start_date.toLocaleDateString("en-US") +
                " " +
                reservation.event.start_date.toLocaleTimeString("en-US") +
                " - " +
                reservation.event.end_date.toLocaleDateString("en-US") +
                " " +
                reservation.event.end_date.toLocaleTimeString("en-US")}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPinned />
          <div className="w-4/5">
            <div className="text-[#0068B2] font-semibold">{t("location_label")}</div>
            <div className="mt-1 text-sm  text-wrap">{reservation.event?.loc_address}</div>
          </div>
        </div>
      </div>

      <div className="text-lg font-bold mt-6">{t("my_ticket_label")}</div>
      <div className="text-[#555555] mt-1">{t("my_ticket_subtitle")}</div>

      <div className="w-full shadow border mt-6 rounded-xl p-4 flex flex-col gap-4">
        <div className="mx-auto mt-4">
          <QRCodeSVG value={reservation.id} size={156} />
        </div>
        <div className="flex items-start gap-3 mt-4">
          <CircleUserIcon />
          <div className="w-4/5">
            <div className="font-semibold">{t("name_label")}</div>
            <div className="mt-1 text-sm">
              {reservation.user?.first_name + " " + reservation.user?.last_name}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Mail />
          <div className="w-4/5">
            <div className="font-semibold">{t("email_label")}</div>
            <div className="mt-1 text-sm  text-wrap">{reservation.user?.email}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Phone />
          <div className="w-4/5">
            <div className="font-semibold">{t("phone_number_label")}</div>
            <div className="mt-1 text-sm  text-wrap">{reservation.user?.phone_number}</div>
          </div>
        </div>

        {new Date().getTime() < new Date(reservation.event?.start_date || "").getTime() && (
          <Button type="text" danger className="font-semibold" onClick={handleCancelReservation}>
            {t("cancel_reservation_button_label")}
          </Button>
        )}
      </div>

      <div className="text-wrap leading-relaxed mt-6">{reservation.event?.description}</div>

      <div
        className="w-full shadow border mt-6 rounded-xl p-4 flex items-center justify-between active:bg-slate-100"
        onClick={() =>
          router.push("/event/" + reservation.event?.id + "/transport", { scroll: true })
        }
      >
        <div className="flex flex-row items-center gap-1.5">
          <Bus />
          <TrainFront />
          <Ship />
          <CarTaxiFront />
        </div>
        <div className="flex items-center gap-1">
          <div className="text-sm font-semibold text-[#0068B2]">
            {t("public_transportation_label")}
          </div>
          <ChevronRight />
        </div>
      </div>

      <div className="w-full shadow border mt-6 rounded-xl p-4 flex flex-row gap-4 items-center">
        <Image
          src={reservation.event?.organizer.icon_image_src || ""}
          width={1920}
          height={1080}
          alt="organizer icon"
          className="w-16 h-16"
        />
        <div className="flex flex-col gap-2">
          <div className="font-semibold">{t("organized_by_label")}</div>
          <div className="text-wrap text-sm">{reservation.event?.organizer.name}</div>
          <div
            className="text-[#0068B2] font-semibold text-sm active:bg-slate-100 rounded-xl"
            onClick={() => router.push("/organizer/" + reservation.event?.organizer_id)}
          >
            {t("view_organizer_profile_label")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationIdPageClient;
