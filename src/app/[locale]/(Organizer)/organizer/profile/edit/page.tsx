"use client";

import { Organizer } from "@/app/types/organizer";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "@/navigation";
import { Avatar, Button, GetProp, Input, Select, Upload, UploadProps } from "antd";
import Password from "antd/es/input/Password";
import TextArea from "antd/es/input/TextArea";
import {
  ChevronLeft,
  Edit,
  Eye,
  FileType,
  Image as ImageIcon,
  ImagePlus,
  Info,
  KeyRound,
  MapPin,
  UserIcon,
} from "lucide-react";
import React, { useContext, useState } from "react";
import ProfilePreview from "./ProfilePreview";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/app/config/firebaseConfig";
import toast from "react-hot-toast";
import { UploadResult, getDownloadURL, ref, uploadBytes } from "firebase/storage";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const EditOrganizerProfilePage = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const currentUser = useContext(AuthContext).currentUser as Organizer;
  const [imageUrl, setImageUrl] = useState(currentUser?.icon_image_src || "");

  const [name, setName] = useState(currentUser?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone_number || "");
  const [address, setAddress] = useState(currentUser?.address || "");
  const [description, setDescription] = useState(currentUser?.description || "");
  const [website, setWebsite] = useState(currentUser?.website || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [selectedCountry, setSelectedCountry] = useState<"TH" | "JP">(currentUser?.country || "");

  const handleChangeProfileImage: UploadProps["onChange"] = (file) => {
    getBase64(file.file.originFileObj as FileType, (url) => {
      setImageUrl(url);
    });
  };

  const uploadAndUpdate = (imageBlob: Blob, updateData: any) => {
    let uploadedImageUrl = "";
    const storageRef = ref(storage, "profiles/organizer/" + Date.now());
    uploadBytes(storageRef, imageBlob)
      .then((result: UploadResult) => {
        return getDownloadURL(result.ref);
      })
      .then((url) => (uploadedImageUrl = url))
      .then(() => {
        return updateDoc(doc(db, "organizers", currentUser.id), {
          ...updateData,
          icon_image_src: uploadedImageUrl,
        });
      })
      .then(() => {
        toast.success("Your organizer's profile has been updated.");
        router.push("/organizer/profile");
        authContext.saveCurrentUser(
          { ...currentUser, ...updateData, icon_image_src: uploadedImageUrl },
          currentUser.id
        );
      })
      .catch((err) => console.log(err));
  };

  const handleEditOrganizerProfile = async () => {
    const newOrganizerData = {
      name,
      phone_number: phoneNumber,
      address,
      description,
      website,
      email,
    };

    const isImageChange = imageUrl !== currentUser.icon_image_src;

    let updateData = {};

    for (let key of Object.keys(newOrganizerData)) {
      if (
        newOrganizerData[key as keyof typeof newOrganizerData] !==
        currentUser[key as keyof typeof currentUser]
      ) {
        updateData = {
          ...updateData,
          [key]: newOrganizerData[key as keyof typeof newOrganizerData],
        };
      }
    }

    if (isImageChange) {
      const imageBlob = await (await fetch(imageUrl)).blob();
      uploadAndUpdate(imageBlob, updateData);
      console.log("IMG CHA");
    } else {
      updateDoc(doc(db, "organizers", currentUser.id), updateData)
        .then(() => {
          toast.success("Your organizer's profile has been updated.");
          router.push("/organizer/profile");
          authContext.saveCurrentUser({ ...currentUser, ...updateData }, currentUser.id);
        })
        .catch((err) => console.log(err));
    }
  };

  if (!currentUser) {
    return <></>;
  }
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
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
          <div className="w-[75%]">
            <p className="m-0 ml-1 mb-2 font-semibold">{"Name"}</p>
            <Input
              className="h-12"
              size="large"
              value={name}
              placeholder={"e.g. Bangkok Metropolitan Administration"}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </div>
        </div>

        <div>
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
              disabled
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
            <p className="m-0 ml-1 mb-3 font-semibold">{"Email"}</p>
            <Input
              className="h-12"
              size="large"
              value={email}
              placeholder={"e.g. hello@world.com"}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>

          <div className="w-full flex flex-col gap-4 items-start mt-8">
            <Button
              type="default"
              size="large"
              className="w-[90%] bg-[#0068B2] text-white"
              onClick={handleEditOrganizerProfile}
            >
              Save Change
            </Button>
            <Button size="large" className="w-[90%]" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2 text-lg justify-center font-bold">
          <Eye />
          Organizer Profile Preview
        </div>
        <div className="border rounded-xl h-fit shadow p-4 py-6">
          <ProfilePreview
            name={name}
            address={address}
            icon_image_src={imageUrl}
            description={description}
            country={selectedCountry}
            phone_number={phoneNumber}
            website={website}
            email={email}
          />
        </div>
      </div>
    </div>
  );
};

export default EditOrganizerProfilePage;
