"use client";

import { db, storage } from "@/app/config/firebaseConfig";
import { Event } from "@/app/types/event";
import { Organizer } from "@/app/types/organizer";
import { AuthContext } from "@/contexts/AuthContext";
import { EVENTS } from "@/mock/events";
import { useRouter } from "@/navigation";
import { Button, DatePicker, GetProp, Image, Input, Switch, Upload, UploadProps } from "antd";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { UploadResult, getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
import { eventNames } from "process";
import React, { useCallback, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

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
  const router = useRouter();
  const currentUser = useContext(AuthContext).currentUser as Organizer;

  const [eventData, setEventData] = useState<Event | null>(null);

  const [imageUrl, setImageUrl] = useState(eventData?.event_image_src || "");
  const [newImageUrl, setNewImageUrl] = useState("");

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(eventData?.start_date) || null);
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(eventData?.end_date) || null);

  const [reservationOption, setReservationOption] = useState({
    isAvailableReservation: eventData?.is_allow_reserve || false,
    isLimitParticipant: eventData?.is_limit_participant || false,
    maxParticipants: eventData?.participant_num || 0,
  });

  const handleEventImageChange: UploadProps["onChange"] = (file) => {
    getBase64(file.file.originFileObj as FileType, (url) => {
      setNewImageUrl(url);
    });
  };

  const getEvent = useCallback(async () => {
    const docRef = doc(db, "events", params.id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    setEventData({
      ...data,
      id: docSnap.id,
      start_date: new Date(data?.start_date.toDate()),
      end_date: new Date(data?.end_date.toDate()),
      organizer: currentUser,
    } as Event);

    setStartDate(dayjs(new Date(data?.start_date.toDate())));
    setEndDate(dayjs(new Date(data?.end_date.toDate())));

    setReservationOption({
      isAvailableReservation: data?.is_allow_reserve,
      isLimitParticipant: data?.is_limit_participant,
      maxParticipants: data?.participant_num,
    });

    setImageUrl(data?.event_image_src);
    setNewImageUrl(data?.event_image_src);
  }, []);

  useEffect(() => {
    getEvent();
  }, [getEvent]);

  const validateFormData = () => {
    const newEventData = {
      event_name: eventData?.event_name,
      start_date: eventData?.start_date,
      end_date: eventData?.end_date,
      loc_name: eventData?.loc_name,
      loc_address: eventData?.loc_address,
    };

    for (let key of Object.keys(newEventData)) {
      if (!newEventData[key as keyof typeof newEventData]) return false;
    }
    return true;
  };

  const uploadNewImageAndUpdate = (imageBlob: Blob, updateData: any) => {
    let uploadedImageUrl = "";
    const storageRef = ref(storage, "events/" + Date.now());
    uploadBytes(storageRef, imageBlob)
      .then((result: UploadResult) => {
        return getDownloadURL(result.ref);
      })
      .then((url) => (uploadedImageUrl = url))
      .then(() => {
        return updateDoc(doc(db, "events", params.id), {
          ...updateData,
          event_image_src: uploadedImageUrl,
        });
      })
      .then(() => {
        toast.success("Successfully, updated event data.");
        router.push("/organizer/event/manage/" + params.id);
      })
      .catch((err) => console.log(err));
  };

  const handleInputValueChange = (event: any) => {
    const currentEventData: Event = eventData as Event;
    setEventData({ ...currentEventData, [event.currentTarget.id]: event.currentTarget.value });
  };

  if (!eventData) return <></>;

  const handleEditEvent = async () => {
    console.log(eventData);

    const isFormDataValid = validateFormData();
    const isImageChange = imageUrl !== newImageUrl;

    const updateData = {
      event_name: eventData.event_name,
      description: eventData.description,
      start_date: startDate?.toDate(),
      end_date: endDate?.toDate(),
      loc_name: eventData.loc_name,
      loc_address: eventData.loc_address,
      trans_bus: eventData.trans_bus,
      trans_train: eventData.trans_train,
      trans_boat: eventData.trans_boat,
      trans_taxi: eventData.trans_taxi,
    };

    if (!isFormDataValid) {
      return toast.error("Error, incorrect form dara, or missing some fields.");
    }

    if (isImageChange) {
      const imageBlob = await (await fetch(newImageUrl)).blob();
      uploadNewImageAndUpdate(imageBlob, updateData);
    } else {
      updateDoc(doc(db, "events", params.id), updateData).then(() => {
        toast.success("Successfully, updated event data.");
        router.push("/organizer/event/manage/" + params.id);
      });
    }
  };
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
              value={eventData.event_name}
              id="event_name"
              onChange={handleInputValueChange}
              placeholder={"e.g. Photo exhibition “Mitsuaki Iwago’s Japanese cat walk”"}
            />
          </div>

          <div className="mt-6 w-[90%]">
            <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Event Description"}</p>
            <TextArea
              placeholder={
                "e.g. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,"
              }
              value={eventData.description}
              id="description"
              onChange={handleInputValueChange}
              size="large"
              rows={4}
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
              value={eventData.loc_name}
              id="loc_name"
              placeholder={"e.g. Century Park Hotel"}
              onChange={handleInputValueChange}
            />
          </div>

          <div className="mt-6 w-[90%]">
            <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Event Description"}</p>
            <TextArea
              placeholder={
                "e.g. Bangkok City Hall (Sao Chingcha) 73 Dinso Road , Phra Nakhon District Bangkok 10200, Thailand"
              }
              value={eventData.loc_address}
              size="large"
              rows={4}
              id="loc_address"
              onChange={handleInputValueChange}
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
                value={eventData.trans_bus}
                id="trans_bus"
                placeholder={"e.g. 1 / 50 / 99"}
                onChange={handleInputValueChange}
              />
            </div>

            <div className="mt-6 w-[80%]">
              <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Train"}</p>
              <Input
                className="h-12"
                size="large"
                value={eventData.trans_train}
                id="trans_train"
                placeholder={"e.g. BTS Phaya Thai Station: Exit 02"}
                onChange={handleInputValueChange}
              />
            </div>

            <div className="mt-6 w-[80%]">
              <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Boat"}</p>
              <Input
                className="h-12"
                size="large"
                value={eventData.trans_boat}
                id="trans_boat"
                placeholder={"e.g. Chao Phaya Pier"}
                onChange={handleInputValueChange}
              />
            </div>

            <div className="mt-6 w-[80%]">
              <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Taxi"}</p>
              <Input
                className="h-12"
                size="large"
                value={eventData.trans_taxi}
                id="trans_taxi"
                placeholder={"e.g. Century Park Hotel nearby Victory Monument."}
                onChange={handleInputValueChange}
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
            disabled={!!newImageUrl}
            onChange={handleEventImageChange}
          >
            {!newImageUrl && (
              <div>
                {" "}
                <ImageIcon size={30} />
              </div>
            )}
          </Upload>

          {newImageUrl && (
            <div>
              <Image src={newImageUrl} alt="Event Image" className="  rounded-xl  object-cover" />
            </div>
          )}

          <div className={`${imageUrl ? "mt-6" : "mt-6"} font-semibold text-center`}>
            Recommend Size is 1920 x 1080 px
          </div>

          <div className="mt-4 w-full flex flex-row items-center justify-center">
            {imageUrl ? (
              <Button
                type="default"
                danger
                className="w-[75%]"
                onClick={() => {
                  setNewImageUrl("");
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
