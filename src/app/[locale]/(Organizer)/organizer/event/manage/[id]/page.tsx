"use client";

import { EVENTS } from "@/mock/events";
import { useRouter } from "@/navigation";
import { Button, Image, Input, Statistic, Switch } from "antd";
import {
  CalendarDays,
  CircleUser,
  Edit,
  Eye,
  Info,
  LucideChevronLeft,
  MapPinned,
  Settings,
  Users,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import EventParticipantTable from "./EventParticipantTable";
import { RESERVATIONS } from "@/mock/reservations";
import { collection, deleteDoc, doc, getDoc, query, updateDoc } from "firebase/firestore";
import { db } from "@/app/config/firebaseConfig";
import { Event } from "@/app/types/event";
import { AuthContext } from "@/contexts/AuthContext";
import { Organizer } from "@/app/types/organizer";

interface ManageEventIdPageParams {
  id: string;
}

const ManageEventIdPage = ({ params }: { params: ManageEventIdPageParams }) => {
  const currentUser = useContext(AuthContext).currentUser as Organizer;
  const router = useRouter();

  const [eventData, setEventData] = useState<Event | null>(null);

  const [isAvailableForReservation, setIsAvailableForReservation] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const eventParticipants = RESERVATIONS.filter((e) => e.event_id == params.id);

  const handleReservationOptionChange = async (checked: boolean) => {
    setIsAvailableForReservation(checked);
    await updateDoc(doc(db, "events", params.id), {
      is_allow_reserve: checked,
    });
    if (checked) {
      toast.success("Successfully, Reservation are now available.");
    } else {
      toast.success("Successfully, This event no longer accepting reservation.");
    }
  };

  const handleDelete = () => {
    if (confirm("Are you confirm to delete this event, this operation can't be revert.")) {
      deleteDoc(doc(db, "events", params.id)).then(() => {
        toast.success("Your event has been deleted!");
        router.push("/organizer/dashboard");
      });
    }
  };

  const getEvent = async () => {
    const docRef = doc(db, "events", params.id);
    const docSnap = await getDoc(docRef);
    const eventData = docSnap.data();
    setEventData({
      ...eventData,
      id: docSnap.id,
      start_date: new Date(eventData?.start_date.toDate()),
      end_date: new Date(eventData?.end_date.toDate()),
      organizer: currentUser,
    } as Event);
    setIsAvailableForReservation(eventData!.is_allow_reserve);
  };

  useEffect(() => {
    getEvent();
    console.log(eventData);
  }, []);

  if (!eventData) {
    return <></>;
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-2  mb-4">
        <div className="flex flex-row items-center gap-2 text-xl font-bold">
          <Settings />
          Organizer Tools - Event Management & Stats
        </div>

        <div className="flex items-center gap-4">
          <Button
            size="large"
            type="default"
            className="flex items-center gap-2"
            onClick={() => router.push("/organizer/dashboard")}
          >
            <LucideChevronLeft size={20} />
            Back to Dashboard
          </Button>
          <Button
            size="large"
            type="primary"
            className="flex items-center gap-2"
            onClick={handleDelete}
            danger
          >
            Delete
          </Button>
          <Button
            size="large"
            type="primary"
            className="flex items-center gap-2"
            onClick={() => router.push("/organizer/event/edit/" + eventData.id)}
          >
            <Edit size={20} />
            Edit This Event
          </Button>
        </div>
      </div>

      <div className="text-lg font-semibold mb-4 text-[#0068B2]">{eventData.event_name}</div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="flex flex-row items-center gap-4">
            <div className="p-6 rounded-xl shadow border w-full">
              <div className=" opacity-[0.75]">Viewers</div>
              <div className="flex flex-row items-center gap-2 mt-2">
                <Eye size={20} />
                <div className="text-2xl">{(eventData?.views || 0).toLocaleString("en-US")}</div>
              </div>
            </div>
            <div className="p-6 rounded-xl shadow border w-full">
              <div className=" opacity-[0.75]">Participants</div>
              <div className="flex flex-row items-center gap-2 mt-2">
                <CircleUser size={20} />
                <div className="text-2xl">
                  {(eventData?.participant_num || 0).toLocaleString("en-US")}
                </div>
              </div>
            </div>
          </div>

          {eventData.event_image_src && (
            <div className="mt-8">
              <Image
                src={eventData?.event_image_src}
                alt="Event Image"
                className=" w-full rounded-xl  object-cover"
              />
            </div>
          )}
        </div>

        <div className=" col-span-2">
          <div className="w-full shadow border rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <CalendarDays />
              <div className="text-lg">
                <div className="text-[#0068B2] font-semibold">{"Event Date"}</div>
                <div className="">
                  {eventData.start_date.toLocaleDateString() +
                    " " +
                    eventData.start_date.toLocaleTimeString() +
                    " - " +
                    eventData.end_date.toLocaleDateString() +
                    " " +
                    eventData.end_date.toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPinned />
              <div className="w-4/5 text-lg ">
                <div className="text-[#0068B2] font-semibold">{"Location"}</div>
                <div className="text-wrap">{eventData.loc_address}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users />
              <div className="text-lg ">
                <div className="text-[#0068B2] font-semibold">{"Participants"}</div>
                <div className="text-wrap">
                  {eventData.participant_num + " people(s) are participated in this event"}
                </div>
              </div>
            </div>
          </div>

          <div className="text-pretty mt-6 text-lg">{eventData.description}</div>
        </div>
      </div>

      <div className=" mt-12 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-xl font-bold">Reservation Management</div>
          <div className="text-lg">
            {"An information about event's reservation you can manege reservation on this section."}
          </div>
        </div>

        {new Date().getTime() < eventData.start_date.getTime() && (
          <div className="font-semibold text-lg flex items-center gap-2 mt-4">
            <Switch
              value={isAvailableForReservation}
              onChange={(checked) => handleReservationOptionChange(checked)}
            />
            Available for Reservation
          </div>
        )}
      </div>

      <Input
        className=" h-10 w-96 mt-6"
        size="large"
        value={searchValue}
        placeholder={"Search using participant name."}
        onChange={(e) => setSearchValue(e.currentTarget.value)}
      />

      <div className="mt-4">
        <EventParticipantTable dataSource={eventParticipants} searchValue={searchValue} />
      </div>
    </div>
  );
};

export default ManageEventIdPage;
