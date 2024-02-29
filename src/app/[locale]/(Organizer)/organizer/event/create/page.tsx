"use client";

import { db, storage } from "@/app/config/firebaseConfig";
import { Organizer } from "@/app/types/organizer";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "@/navigation";
import {
  Button,
  DatePicker,
  GetProp,
  Image,
  Input,
  Select,
  Switch,
  Upload,
  UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { Dayjs } from "dayjs";
import { addDoc, collection } from "firebase/firestore";
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
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const CreateEventPage = () => {
  const router = useRouter();
  const currentUser = useContext(AuthContext).currentUser as Organizer;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedEventCategory, setSelectedEventCategory] = useState("0");

  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const [locationName, setLocationName] = useState("");
  const [locationAddress, setLocationAddress] = useState("");

  const [publicTransportation, setPublicTransportation] = useState({
    bus: "",
    train: "",
    boat: "",
    taxi: "",
  });

  const [reservationOption, setReservationOption] = useState({
    isAvailableReservation: false,
    isLimitParticipant: false,
    maxParticipants: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleEventImageChange: UploadProps["onChange"] = (file) => {
    getBase64(file.file.originFileObj as FileType, (url) => {
      setImageUrl(url);
    });
  };

  const uploadAndCreate = (imageBlob: Blob, eventData: any) => {
    let uploadedImageUrl = "";
    const storageRef = ref(storage, "events/" + Date.now());
    uploadBytes(storageRef, imageBlob)
      .then((result: UploadResult) => {
        return getDownloadURL(result.ref);
      })
      .then((url) => (uploadedImageUrl = url))
      .then(() => {
        return addDoc(collection(db, "events"), {
          ...eventData,
          event_image_src: uploadedImageUrl,
        });
      })
      .then((result) => {
        toast.success("Successfully, created new event!");
        router.push("/organizer/event/manage/" + result.id);
      })
      .catch((err) => console.log(err));
  };

  const validateFormData = () => {
    const newEventData = {
      event_name: name,
      category_id: selectedEventCategory,
      start_date: startDate,
      endDate: endDate,
      loc_name: locationName,
      loc_address: locationAddress,
    };

    for (let key of Object.keys(newEventData)) {
      if (!newEventData[key as keyof typeof newEventData]) return false;
    }
    return true;
  };

  const handleCreateNewEvent = async () => {
    if (!validateFormData()) {
      toast.error("Event data incorrect please check your information, or some field is missing.");
      return;
    }

    setIsLoading(true);

    console.log(currentUser);

    const newEventData = {
      event_name: name,
      category_id: selectedEventCategory,
      description: description,
      start_date: startDate?.toDate(),
      end_date: endDate?.toDate(),
      loc_name: locationName,
      loc_address: locationAddress,
      trans_bus: publicTransportation.bus,
      trans_train: publicTransportation.train,
      trans_boat: publicTransportation.boat,
      trans_taxi: publicTransportation.taxi,
      participant_num: reservationOption.maxParticipants,
      is_allow_reserve: reservationOption.isAvailableReservation,
      is_limit_participant: reservationOption.isLimitParticipant,
      organizer_id: currentUser.id,
      country: currentUser.country == "TH" ? "BKK" : "FK",
      views: 0,
    };

    if (imageUrl) {
      const imageBlob = await (await fetch(imageUrl)).blob();
      uploadAndCreate(imageBlob, newEventData);
    } else {
      addDoc(collection(db, "events"), newEventData)
        .then((result) => {
          toast.success("Successfully, created new event!");
          router.push("/organizer/event/manage/" + result.id);
        })
        .catch((err) => console.log(err));
    }

    setIsLoading(false);
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-2  mb-6">
        <div className="flex flex-row items-center gap-2 text-xl font-bold">
          <Edit />
          Create Event
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
            onClick={handleCreateNewEvent}
            loading={isLoading}
          >
            Save & Create Event
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

          <div className="mt-6 w-[90%]">
            <p className="m-0 ml-1 mb-3 font-semibold text-[#0068B2]">{"Event Category"}</p>
            <Select
              defaultValue="0"
              className="w-full h-12"
              size="large"
              onChange={setSelectedEventCategory}
              value={selectedEventCategory}
              options={[
                { value: "0", label: "Technology" },
                { value: "1", label: "Entertainment" },
                { value: "2", label: "Art" },
                { value: "3", label: "Music" },
                { value: "4", label: "Film" },
                { value: "5", label: "Lectures & Books" },
                { value: "6", label: "Fashion" },
                { value: "7", label: "Food & Drink" },
                { value: "8", label: "Charities" },
                { value: "9", label: "Sports & Active Life" },
                { value: "10", label: "Kids & Family" },
                { value: "12", label: "Festivals" },
                { value: "11", label: "Other" },
              ]}
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
                className="w-[90%] h-12"
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
                className="w-[90%] h-12"
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

export default CreateEventPage;
