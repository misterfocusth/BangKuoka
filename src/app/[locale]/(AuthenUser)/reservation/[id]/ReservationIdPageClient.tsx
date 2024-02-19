"use client";

import { Reservation } from "@/app/types/reservation";
import EventCategoryChip from "@/components/chip/EventCategoryChip";
import { NavbarContext } from "@/contexts/NavbarContext";
import { useRouter } from "@/navigation";
import { Button } from "antd";
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
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";

interface ReservationIdPageClientProps {
  reservation: Reservation;
}

const ReservationIdPageClient: React.FC<ReservationIdPageClientProps> = ({ reservation }) => {
  const router = useRouter();
  const navbarContext = useContext(NavbarContext);
  const t = useTranslations("Index");

  const handleCancelReservation = () => {
    if (confirm()) {
      toast.success("Your reservation has been cancel.");
      router.back();
    }
  };

  useEffect(() => {
    navbarContext.setNavbarTitle(t("my_reservation_info_label"));
  }, [navbarContext, t]);

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
              {reservation.event?.start_date + " - " + reservation.event?.end_date}
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
        className="w-full shadow border mt-6 rounded-xl p-4 flex items-center justify-between"
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
            className="text-[#0068B2] font-semibold text-sm"
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
