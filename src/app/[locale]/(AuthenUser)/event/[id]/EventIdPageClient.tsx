"use client";

import { db } from "@/app/config/firebaseConfig";
import { Event } from "@/app/types/event";
import { Organizer } from "@/app/types/organizer";
import { User } from "@/app/types/user";
import SaveEventButton from "@/components/button/SaveEventButton";
import EventCategoryChip from "@/components/chip/EventCategoryChip";
import { AuthContext } from "@/contexts/AuthContext";
import { NavbarContext } from "@/contexts/NavbarContext";
import { useRouter } from "@/navigation";
import { Button, Skeleton } from "antd";
import { addDoc, collection, doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import {
  Bus,
  CalendarDays,
  CarTaxiFront,
  ChevronRight,
  MapPinned,
  Ship,
  TrainFront,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { use, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface EventIdPageClientProps {
  eventId: string;
}

const EventIdPageClient: React.FC<EventIdPageClientProps> = ({ eventId }) => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser as User;
  const isUserSaveEvent = currentUser?.saved_events?.some((e) => e === eventId);

  const [eventData, setEventData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReserving, setIsReserving] = useState(false);

  const router = useRouter();
  const t = useTranslations("Index");
  const navbarContext = useContext(NavbarContext);

  const handleMakeReservation = async () => {
    if (!confirm("Are you confirm to book this event?")) return;

    setIsReserving(true);

    try {
      await runTransaction(db, async (transaction) => {
        const event = await transaction.get(doc(db, "events", eventId));
        const reservation = await addDoc(collection(db, "reservations"), {
          user_id: currentUser.id,
          event_id: eventData?.id,
          status_id: 0,
          reserve_on: Date.now(),
          ticket_amount: 1,
        });

        const newEventViewer = event.data()!.views + 1;
        const newEventParticipant = event.data()!.participant_num + 1;
        transaction.update(event.ref, {
          viewer: newEventViewer,
          participant_num: newEventParticipant,
        });

        toast.success("Reservation has been made successfully!");
        router.push("/reservation/" + reservation.id);
      });

      setIsReserving(false);
    } catch (error) {
      console.error("Error adding document: ", error);
      setIsReserving(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
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

      const eventData: Event = {
        ...event,
        id: eventDocSnap.id,
        start_date: new Date(eventDocSnap.data()!.start_date.toDate()),
        end_date: new Date(eventDocSnap.data()!.end_date.toDate()),
      };

      await updateDoc(eventRef, {
        views: eventDocSnap.data()!.views + 1,
      });

      navbarContext.setNavbarTitle(eventData.event_name);
      setIsLoading(false);
      setEventData(eventData);
    }

    fetchData();
  }, [eventId, navbarContext]);

  if (!eventData || isLoading) {
    return (
      <div className="mt-6">
        <Skeleton active loading />
      </div>
    );
  }

  return (
    <div className="mb-20">
      <div className="relative">
        <Image
          src={eventData.event_image_src}
          width={1920}
          height={1080}
          className="w-full h-full rounded-xl"
          alt="event image"
        />
        <div className=" absolute top-0 right-0">
          <SaveEventButton isUserSaveEvent={isUserSaveEvent} />
        </div>
        <div className="absolute bottom-0 m-3">
          <EventCategoryChip categoryId={eventData.category_id + ""} />
        </div>
      </div>

      <div className="mt-6 text-lg font-bold">{eventData.event_name}</div>

      <div className="w-full shadow border mt-6 rounded-xl p-4 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <CalendarDays />
          <div>
            <div className="text-[#0068B2] font-semibold">{t("event_date_label")}</div>
            <div className="mt-1 text-sm">
              {eventData.start_date.toLocaleDateString("en-US") +
                " " +
                eventData.start_date.toLocaleTimeString("en-US") +
                " - " +
                eventData.end_date.toLocaleDateString("en-US") +
                " " +
                eventData.end_date.toLocaleTimeString("en-US")}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPinned />
          <div className="w-4/5">
            <div className="text-[#0068B2] font-semibold">{t("location_label")}</div>
            <div className="mt-1 text-sm  text-wrap">{eventData.loc_address}</div>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users />
          <div>
            <div className="text-[#0068B2] font-semibold">{t("participants_label")}</div>
            <div className="mt-1 text-sm text-wrap">
              {eventData.participant_num + " " + t("people_are_participated_in_this_event_label")}
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-full shadow border mt-6 rounded-xl p-4 flex items-center justify-between active:bg-slate-100"
        onClick={() => router.push("/event/" + eventData.id + "/transport", { scroll: true })}
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

      <div className="text-wrap leading-relaxed mt-6">{eventData.description}</div>

      <Button
        className="w-full font-bold mt-6 p-6 flex flex-row items-center justify-center"
        size="large"
        type="primary"
        onClick={handleMakeReservation}
        loading={isReserving}
      >
        {t("make_reservation_button_label")}
      </Button>

      <div className="w-full shadow border mt-6 rounded-xl p-4 flex flex-row gap-4 items-center">
        <Image
          src={eventData.organizer.icon_image_src}
          width={1920}
          height={1080}
          alt="organizer icon"
          className="w-16 h-16"
        />
        <div className="flex flex-col gap-2">
          <div className="font-semibold">{t("organized_by_label")}</div>
          <div className="text-wrap text-sm">{eventData.organizer.name}</div>
          <div
            className="text-[#0068B2] font-semibold text-sm active:bg-slate-100 rounded-xl"
            onClick={() => router.push("/organizer/" + eventData.organizer_id)}
          >
            {t("view_organizer_profile_label")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventIdPageClient;
