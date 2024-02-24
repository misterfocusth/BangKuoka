"use client";

import { Organizer } from "@/app/types/organizer";
import { AuthContext } from "@/contexts/AuthContext";
import { EVENTS } from "@/mock/events";
import { useRouter } from "@/navigation";
import { Avatar, Button, GetProp, Statistic, Upload, UploadProps } from "antd";
import {
  AreaChart,
  CheckCircle2,
  CircleUser,
  Edit,
  Eye,
  ImagePlus,
  LibraryBig,
  Map,
  MapPin,
  UserIcon,
} from "lucide-react";
import React, { useContext, useMemo, useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const OrganizerProfilePage = () => {
  const router = useRouter();
  const currentUser = useContext(AuthContext).currentUser as Organizer;
  const [imageUrl, setImageUrl] = useState(currentUser?.icon_image_src || "");

  const handleChangeProfileImage: UploadProps["onChange"] = (file) => {
    getBase64(file.file.originFileObj as FileType, (url) => {
      setImageUrl(url);
    });
  };

  if (!currentUser) {
    return <></>;
  }

  return (
    <div>
      {/* <div className="flex flex-row items-center gap-2 text-xl font-bold mb-6">
        <CircleUser />
        {"Organizer's Profile"}
      </div> */}
      <div className="flex flex-row items-center gap-6">
        <Upload
          name="avatar"
          listType="picture-circle"
          className="avatar-uploader w-fit"
          showUploadList={false}
          onChange={handleChangeProfileImage}
        >
          {imageUrl ? (
            <div className="relative">
              <Avatar size={102} icon={<UserIcon size={42} />} src={imageUrl} />
              <div className=" absolute right-0 bottom-0 rounded-full bg-[#0068B2] flex items-center justify-center p-2">
                <Edit size={16} color="#fff" className="p-0 m-auto" />
              </div>
            </div>
          ) : (
            <div className="relative">
              <Avatar size={102} icon={<UserIcon size={42} />} />
              <div className=" absolute right-0 bottom-0 rounded-full bg-[#0068B2] flex items-center justify-center p-2">
                <ImagePlus size={16} color="#fff" className="p-0 m-auto" />
              </div>
            </div>
          )}
        </Upload>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col">
            <div className="text-xl font-bold">{currentUser.name}</div>
            <div className="text-lg font-semibold mt-1 text-[#0068B2] flex flex-row items-center gap-1">
              <MapPin />
              {currentUser.country === "TH" ? "Bangkok, Thailand" : "Fukuoka, Japan"}
            </div>
          </div>

          <Button
            type="primary"
            size="large"
            className="flex flex-row items-center gap-2"
            onClick={() => router.push("/organizer/profile/edit")}
          >
            <Edit size={16} />
            Edit Organizer Profile
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-row items-center gap-2 text-lg font-bold text-[#0068B2]">
        <AreaChart />
        Stats for organizers and events.
      </div>
      <div className="grid items-center grid-cols-5 gap-6 mt-2">
        <div className="p-6 rounded-xl shadow">
          <Statistic prefix={<LibraryBig size={20} />} title="Your Events" value={112893} />
        </div>
        <div className="p-6 rounded-xl shadow">
          <Statistic
            prefix={<CheckCircle2 size={20} />}
            title="Event's Participants"
            value={112893}
          />
        </div>
        <div className="p-6 rounded-xl shadow">
          <Statistic prefix={<Eye size={20} />} title="Total Event's Views" value={112893} />
        </div>
        <div className="p-6 rounded-xl shadow">
          <Statistic prefix={<CircleUser size={20} />} title="Local Organizers" value={112893} />
        </div>
        <div className="p-6 rounded-xl shadow">
          <Statistic prefix={<CircleUser size={20} />} title="Intl. Organizers" value={112893} />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-[#0068B2] text-lg">Description</div>
          <div className=" text-lg">{currentUser.description}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-[#0068B2] text-lg">Address</div>
          <div className=" text-lg">{currentUser.address}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-[#0068B2] text-lg">Phone</div>
          <div className=" text-lg">{currentUser.phone_number}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-[#0068B2] text-lg">Email</div>
          <div className=" text-lg">{currentUser.email}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="font-semibold text-[#0068B2] text-lg">Website</div>
          <div className=" text-lg">{currentUser.website}</div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerProfilePage;
