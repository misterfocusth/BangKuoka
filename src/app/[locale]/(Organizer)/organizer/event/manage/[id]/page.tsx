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
import { useState } from "react";
import toast from "react-hot-toast";
import EventParticipantTable from "./EventParticipantTable";
import { RESERVATIONS } from "@/mock/reservations";

interface ManageEventIdPageParams {
  id: string;
}

const ManageEventIdPage = ({ params }: { params: ManageEventIdPageParams }) => {
  const router = useRouter();
  const eventData = EVENTS.find((e) => e.id == params.id);

  const [isAvailableForReservation, setIsAvailableForReservation] = useState(
    eventData?.is_allow_reserve || false
  );
  const [searchValue, setSearchValue] = useState("");

  const eventParticipants = RESERVATIONS.filter((e) => e.event_id == params.id);

  const handleReservationOptionChange = (checked: boolean) => {
    setIsAvailableForReservation(checked);
    if (checked) {
      toast.success("Successfully, Reservation are now available.");
    } else {
      toast.success("Successfully, This event no longer accepting reservation.");
    }
  };

  if (!eventData) {
    return <></>;
  }

  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-2  mb-6">
        <div className="flex flex-row items-center gap-2 text-xl font-bold">
          <Settings />
          Organizer Tools - Event Management & Stats
        </div>

        <div className="flex items-center gap-4">
          <Button
            size="large"
            type="default"
            className="flex items-center gap-2"
            onClick={() => router.back()}
          >
            <LucideChevronLeft size={20} />
            Back to Dashboard
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

          <div className="mt-8">
            <Image
              src={eventData?.event_image_src}
              alt="Event Image"
              className=" w-full rounded-xl  object-cover"
            />
          </div>
        </div>

        <div className=" col-span-2">
          <div className="w-full shadow border rounded-xl p-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <CalendarDays />
              <div className="text-lg">
                <div className="text-[#0068B2] font-semibold">{"Event Date"}</div>
                <div className="">
                  {eventData.start_date.toUTCString() +
                    " - " +
                    new Date(eventData.end_date).toUTCString()}
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

        <div className="font-semibold text-lg flex items-center gap-2 mt-4">
          <Switch
            value={isAvailableForReservation}
            onChange={(checked) => handleReservationOptionChange(checked)}
          />
          Available for Reservation
        </div>
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
