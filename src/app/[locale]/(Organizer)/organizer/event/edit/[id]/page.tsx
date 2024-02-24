"use client";

import { EVENTS } from "@/mock/events";
import { useRouter } from "@/navigation";
import { Button, DatePicker, GetProp, Image, Input, Switch, Upload, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import {
  Bus,
  CalendarClock,
  CarTaxiFront,
  ChevronLeft,
  Edit,
  Image as ImageIcon,
  Info,
  Map,
  Settings,
  Ship,
  TrainFrontIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface ManageEventIdPageParams {
  id: string;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const EditEventPage = ({ params }: { params: ManageEventIdPageParams }) => {
  const eventData = EVENTS.find((e) => e.organizer_id == params.id);

  const router = useRouter();

  const [name, setName] = useState(eventData?.event_name || "");
  const [description, setDescription] = useState(eventData?.description || "");
  const [imageUrl, setImageUrl] = useState(eventData?.event_image_src || "");

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(eventData?.start_date) || null);
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(eventData?.end_date) || null);

  const [locationName, setLocationName] = useState(eventData?.loc_name || "");
  const [locationAddress, setLocationAddress] = useState(eventData?.loc_address || "");

  const [publicTransportation, setPublicTransportation] = useState({
    bus: eventData?.trans_boat || "",
    train: eventData?.trans_train || "",
    boat: eventData?.trans_boat || "",
    taxi: eventData?.trans_taxi || "",
  });

  const [reservationOption, setReservationOption] = useState({
    isAvailableReservation: eventData?.is_allow_reserve || false,
    isLimitParticipant: eventData?.is_limit_participant || false,
    maxParticipants: eventData?.participant_num || 0,
  });

  const handleEventImageChange: UploadProps["onChange"] = (file) => {
    getBase64(file.file.originFileObj as FileType, (url) => {
      setImageUrl(url);
    });
  };

  if (!eventData) return <></>;

  const handleEditEvent = () => {};
  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-2  mb-6">
        <div className="flex flex-row items-center gap-2 text-xl font-bold">
          <Edit />
          Edit Event Information
        </div>

        <div className="flex items-center gap-4">
          <Button
            size="large"
            type="default"
            className="flex items-center gap-1"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            size="large"
            type="primary"
            className="flex items-center gap-1"
            onClick={handleEditEvent}
          >
            Save Change & Edit Event
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 pt-4">
        <div className="col-span-3">
          <div className="flex flex-row items-center gap-2 text-xl font-bold">
            <Info />
            Basic Event Info
          </div>

          <div className="mt-6 w-[90%]">
            <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Event Name"}</p>
            <Input
              className="h-12"
              size="large"
              value={name}
              placeholder={"e.g. Photo exhibition “Mitsuaki Iwago’s Japanese cat walk”"}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>

          <div className="mt-6 w-[90%]">
            <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Event Description"}</p>
            <TextArea
              placeholder={
                "e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
              }
              value={description}
              size="large"
              rows={4}
              onChange={(e) => setDescription(e.currentTarget.value)}
            />
          </div>

          <div className="flex flex-row items-center gap-2 text-xl font-bold mt-8">
            <CalendarClock />
            Event Date and Time
          </div>

          <div className="grid grid-cols-2">
            <div className="mt-6 w-[90%]">
              <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Start Date & Time"}</p>
              <DatePicker
                size="large"
                value={startDate}
                onChange={(date: Dayjs) => {
                  console.log(date);
                  setStartDate(date);
                }}
                showTime
                needConfirm
                className="w-[90%]"
              />
            </div>

            <div className="mt-6 w-[90%]">
              <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"End Date & Time"}</p>
              <DatePicker
                size="large"
                value={endDate}
                onChange={(date: Dayjs) => {
                  console.log(date);
                  setEndDate(date);
                }}
                showTime
                needConfirm
                className="w-[90%]"
              />
            </div>
          </div>

          <div className="flex flex-row items-center gap-2 text-xl font-bold mt-8">
            <Map />
            Event Location and Address
          </div>

          <div className="mt-6 w-[90%]">
            <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Event Name"}</p>
            <Input
              className="h-12"
              size="large"
              value={locationName}
              placeholder={"e.g. Century Park Hotel"}
              onChange={(e) => setLocationName(e.currentTarget.value)}
            />
          </div>

          <div className="mt-6 w-[90%]">
            <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Event Description"}</p>
            <TextArea
              placeholder={
                "e.g. Bangkok City Hall (Sao Chingcha) 73 Dinso Road , Phra Nakhon District Bangkok 10200, Thailand"
              }
              value={locationAddress}
              size="large"
              rows={4}
              onChange={(e) => setLocationAddress(e.currentTarget.value)}
            />
          </div>

          <div className="flex flex-row items-center gap-3 text-xl font-bold mt-8">
            <div className="flex flex-row items-center gap-2">
              <Bus />
              <TrainFrontIcon />
              <Ship />
              <CarTaxiFront />
            </div>
            Public Transportation Guide
          </div>

          <div className="grid grid-cols-2">
            <div className="mt-6 w-[80%]">
              <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Bus"}</p>
              <Input
                className="h-12"
                size="large"
                value={publicTransportation.bus}
                placeholder={"e.g. 1 / 50 / 99"}
                onChange={(e) =>
                  setPublicTransportation((prev) => ({ ...prev, bus: e.currentTarget.value }))
                }
              />
            </div>

            <div className="mt-6 w-[80%]">
              <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Train"}</p>
              <Input
                className="h-12"
                size="large"
                value={publicTransportation.train}
                placeholder={"e.g. BTS Phaya Thai Station: Exit 02"}
                onChange={(e) =>
                  setPublicTransportation((prev) => ({ ...prev, train: e.currentTarget.value }))
                }
              />
            </div>

            <div className="mt-6 w-[80%]">
              <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Boat"}</p>
              <Input
                className="h-12"
                size="large"
                value={publicTransportation.boat}
                placeholder={"e.g. Chao Phaya Pier"}
                onChange={(e) =>
                  setPublicTransportation((prev) => ({ ...prev, boat: e.currentTarget.value }))
                }
              />
            </div>

            <div className="mt-6 w-[80%]">
              <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Taxi"}</p>
              <Input
                className="h-12"
                size="large"
                value={publicTransportation.taxi}
                placeholder={"e.g. Century Park Hotel nearby Victory Monument."}
                onChange={(e) =>
                  setPublicTransportation((prev) => ({ ...prev, taxi: e.currentTarget.value }))
                }
              />
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="flex flex-row items-center gap-2 text-xl font-bold">
            <ImageIcon />
            Event Image
          </div>

          <Upload
            name="avatar"
            listType="picture-card"
            className="min-w-full flex flex-row items-center justify-center mt-6 "
            showUploadList={false}
            disabled={!!imageUrl}
            onChange={handleEventImageChange}
          >
            {imageUrl ? (
              <div className="mt-12">
                <Image
                  src={imageUrl}
                  alt="Event Image"
                  className=" w-72 rounded-xl  object-cover"
                />
              </div>
            ) : (
              <div>
                {" "}
                <ImageIcon size={30} />
              </div>
            )}
          </Upload>
          <div className={`${imageUrl ? "mt-16" : "mt-6"} font-semibold text-center`}>
            Recommend Size is 1920 x 1080 px
          </div>

          <div className="mt-4 w-full flex flex-row items-center justify-center">
            {imageUrl ? (
              <Button
                type="default"
                danger
                className="w-[75%]"
                onClick={() => {
                  setImageUrl("");
                }}
              >
                Delete an image
              </Button>
            ) : (
              <Upload
                onChange={handleEventImageChange}
                className="w-[90%] mx-auto flex items-center justify-center"
              >
                <Button type="primary">Choose an image</Button>
              </Upload>
            )}
          </div>

          <div className="flex flex-row items-center gap-2 text-xl font-bold mt-12">
            <Settings />
            Reservation Option
          </div>

          <div className="text-[#0068B2] font-semibold flex items-center gap-2 mt-4">
            <Switch
              value={reservationOption.isAvailableReservation}
              onChange={(checked) =>
                setReservationOption((prev) => ({
                  ...prev,
                  isAvailableReservation: checked,
                }))
              }
            />
            Accept for Reservation
          </div>

          <div className="text-[#0068B2] font-semibold flex items-center gap-2 mt-4">
            <Switch
              value={reservationOption.isLimitParticipant}
              onChange={(checked) =>
                setReservationOption((prev) => ({
                  ...prev,
                  isLimitParticipant: checked,
                }))
              }
            />
            Limit number of participants
          </div>

          <div className="mt-6 w-[90%]">
            <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Maximum Participants"}</p>
            <Input
              className="h-10"
              size="large"
              value={reservationOption.maxParticipants}
              placeholder={"leave it empty if not limit."}
              onChange={(e) =>
                setReservationOption((prev) => ({
                  ...prev,
                  maxParticipants: Number(e.currentTarget.value),
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEventPage;
