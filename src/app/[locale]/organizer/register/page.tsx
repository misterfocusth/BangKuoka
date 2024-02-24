"use client";

import { db, storage } from "@/app/config/firebaseConfig";
import { useRouter } from "@/navigation";
import { Avatar, Button, GetProp, Input, Select, Spin, Upload, UploadProps } from "antd";
import Password from "antd/es/input/Password";
import TextArea from "antd/es/input/TextArea";
import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { UploadResult, getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
import toast from "react-hot-toast";

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

  const [isLoading, setIsLoading] = useState(false);

  const handleChangeProfileImage: UploadProps["onChange"] = (file) => {
    getBase64(file.file.originFileObj as FileType, (url) => {
      setImageUrl(url);
    });
  };

  const uploadAndRegister = (imageBlob: Blob) => {
    let uploadedImageUrl = "";
    const storageRef = ref(storage, "profiles/organizer/" + Date.now());
    uploadBytes(storageRef, imageBlob)
      .then((result: UploadResult) => {
        return getDownloadURL(result.ref);
      })
      .then((url) => (uploadedImageUrl = url))
      .then(() => {
        return addDoc(collection(db, "organizers"), {
          name,
          email,
          phone_number: phoneNumber,
          website,
          country: selectedCountry,
          address: address,
          description,
          password: cfPassword,
          event: [],
          icon_image_src: uploadedImageUrl,
        });
      })
      .then((result) => console.log(result))
      .catch((err) => console.log(err));

    return uploadedImageUrl;
  };

  const validateFormData = () => {
    const organizerData = {
      name,
      email,
      phone_number: phoneNumber,
      website,
      country: selectedCountry,
      address: address,
      description,
      password: cfPassword,
    };

    for (let key of Object.keys(organizerData)) {
      if (!organizerData[key as keyof typeof organizerData]) return false;
    }

    return true;
  };

  const handleRegister = async () => {
    setIsLoading(true);

    if (!validateFormData()) {
      toast.error("Error, please fill organizer's info.");
      setIsLoading(false);
      return;
    }

    if (password != cfPassword) {
      toast.error("Error, Password did not match.");
      setIsLoading(false);
      return;
    }

    const organizerRef = collection(db, "organizers");
    const q = query(organizerRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      toast.error("This email has been used, please use other email address.");
      setIsLoading(false);
      return;
    }

    if (imageUrl) {
      const imageBlob = await (await fetch(imageUrl)).blob();
      uploadAndRegister(imageBlob);
    } else {
      await addDoc(collection(db, "organizers"), {
        name,
        email,
        phone_number: phoneNumber,
        website,
        country: selectedCountry,
        address: address,
        description,
        password: cfPassword,
        event: [],
        icon_image_src: "",
      }).catch((err) => console.log(err));
    }

    setIsLoading(false);

    toast.success("Successfully, you can now login with your organizer account.");
    router.replace("/organizer");
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
                type="number"
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
                type="url"
                placeholder={"e.g. http://www.google.com"}
                onChange={(e) => setWebsite(e.currentTarget.value)}
              />
            </div>

            <div className="mt-8 w-[90%]">
              <p className="m-0 ml-1 mb-3 font-semibold">{"Email"}</p>
              <Input
                className="h-12"
                size="large"
                type="email"
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

      <div className="w-full mx-auto flex items-center justify-center gap-8">
        <Button type="default" size="large" className="w-[35%]" onClick={() => router.back()}>
          Back to login
        </Button>

        <Button
          type="default"
          size="large"
          className="w-[35%] bg-[#0068B2] text-white"
          // onClick={() => router.push("/organizer/dashboard")}
          onClick={handleRegister}
          loading={isLoading}
        >
          Create a new account
        </Button>
      </div>
    </div>
  );
};

export default OrganizerRegisterPage;
