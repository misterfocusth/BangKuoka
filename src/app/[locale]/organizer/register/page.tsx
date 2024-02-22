"use client";

import { useRouter } from "@/navigation";
import { Avatar, Button, GetProp, Input, Select, Upload, UploadProps } from "antd";
import Password from "antd/es/input/Password";
import TextArea from "antd/es/input/TextArea";
import {
  ChevronLeft,
  Edit,
  FileType,
  Image as ImageIcon,
  ImagePlus,
  Info,
  KeyRound,
  UserIcon,
} from "lucide-react";
import React, { useState } from "react";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const OrganizerRegisterPage = () => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<"TH" | "JP">("TH");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");

  const handleChangeProfileImage: UploadProps["onChange"] = (file) => {
    getBase64(file.file.originFileObj as FileType, (url) => {
      setImageUrl(url);
    });
  };

  return (
    <div>
      <div className="flex items-center gap-4 shadow border-b bg-white p-4 text-xl font-bold">
        <ChevronLeft className=" cursor-pointer" onClick={() => router.back()} />
        <div className="text-xl font-bold text-[#136912]">
          Bang<span className="text-[#0068B2]">Kuoka</span>
        </div>
        Register New Account (For Organizer)
      </div>

      <div className="grid grid-cols-4 p-12">
        <div className="col-span-3">
          <div className="flex flex-row items-center gap-2 text-xl font-bold">
            <Info />
            Organizer Info
          </div>

          <div className=" grid grid-cols-2">
            <div className="mt-8 w-[90%]">
              <p className="m-0 ml-1 mb-3 font-semibold">{"Name"}</p>
              <Input
                className="h-12"
                size="large"
                value={name}
                placeholder={"e.g. Bangkok Metropolitan Administration"}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>

            <div className="mt-8 w-[90%]">
              <p className="m-0 ml-1 mb-3 font-semibold">{"Phone Number"}</p>
              <Input
                className="h-12"
                size="large"
                value={phoneNumber}
                placeholder={"e.g. +6612-345-6789"}
                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
              />
            </div>

            <div className="mt-8 w-[90%]">
              <p className="m-0 ml-1 mb-3 font-semibold">{"Address"}</p>
              <TextArea
                placeholder={
                  "e.g. Bangkok City Hall (Sao Chingcha) 73 Dinso Road , Phra Nakhon District Bangkok 10200, Thailand"
                }
                value={address}
                size="large"
                rows={4}
                onChange={(e) => setAddress(e.currentTarget.value)}
              />
            </div>

            <div className="mt-8 w-[90%]">
              <p className="m-0 ml-1 mb-3 font-semibold">{"Description"}</p>
              <TextArea
                placeholder={"Organizer's Description"}
                value={description}
                size="large"
                rows={4}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </div>

            <div className="mt-8 w-[90%]">
              <p className="m-0 ml-1 mb-3 font-semibold">{"Base Location"}</p>
              <Select
                defaultValue="TH"
                className="w-full h-12"
                size="large"
                onChange={setSelectedCountry}
                value={selectedCountry}
                options={[
                  { value: "TH", label: "Bangkok, Thailand" },
                  { value: "JP", label: "Fukuoka, Japan" },
                ]}
              />
            </div>

            <div className="mt-8 w-[90%]">
              <p className="m-0 ml-1 mb-3 font-semibold">{"Website"}</p>
              <Input
                className="h-12"
                size="large"
                value={website}
                placeholder={"e.g. http://www.google.com"}
                onChange={(e) => setWebsite(e.currentTarget.value)}
              />
            </div>

            <div className="mt-8 w-[90%]">
              <p className="m-0 ml-1 mb-3 font-semibold">{"Website"}</p>
              <Input
                className="h-12"
                size="large"
                value={email}
                placeholder={"e.g. hello@world.com"}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </div>

            <div></div>

            <div className="flex flex-row items-center gap-2 text-xl font-bold mt-12">
              <KeyRound />
              Credentials Info
            </div>

            <div></div>

            <div className="mt-8 w-[90%]">
              <p className="m-0 ml-1 mb-3 font-semibold">{"Password"}</p>
              <Password
                className="h-12"
                size="large"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>

            <div className="mt-8 w-[90%]">
              <p className="m-0 ml-1 mb-3 font-semibold">{"Confirm Password"}</p>
              <Password
                className="h-12"
                size="large"
                value={cfPassword}
                onChange={(e) => setCfPassword(e.currentTarget.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mx-auto">
          <div className="flex flex-row items-center gap-2 text-xl font-bold">
            <ImageIcon />
            {"Organizer's Profile Image"}
          </div>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader flex flex-row items-center justify-center mt-6"
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
          <div className="mt-6">Recommend Size is 1920 x 1080 px</div>
        </div>
      </div>

      <div className="w-full mx-auto flex items-center justify-center">
        <Button type="default" size="large" className="w-[75%] bg-[#0068B2] text-white">
          Create a new account
        </Button>
      </div>
    </div>
  );
};

export default OrganizerRegisterPage;
