"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { NavbarContext } from "@/contexts/NavbarContext";
import {
  Avatar,
  Button,
  Checkbox,
  DatePicker,
  DatePickerProps,
  GetProp,
  Input,
  RadioChangeEvent,
  Select,
  Spin,
  Upload,
  UploadProps,
} from "antd";
import Password from "antd/es/input/Password";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { Edit, FileType, ImagePlus, KeyRound, Mail, Phone, User as UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";
import { Group } from "antd/es/radio";
import toast from "react-hot-toast";
import { User } from "@/app/types/user";

const dateFormat = "DD MMMM YYYY";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    toast.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    toast.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const EditProfilePageClient = () => {
  const authContext = useContext(AuthContext);
  const currentUser = authContext.currentUser as User;
  const navbarContext = useContext(NavbarContext);
  const t = useTranslations("Index");

  const [name, setName] = useState({
    fname: currentUser?.first_name,
    lname: currentUser?.last_name,
  });
  const [email, setEmail] = useState<string>(currentUser?.email || "");
  const [selectedGender, setSelectedGender] = useState<"MALE" | "FEMALE">(
    currentUser?.gender || "MALE"
  );
  const [selectedNationality, setSelectedNationality] = useState<"TH" | "JP">(
    currentUser?.nationality || "TH"
  );
  const [address, setAddress] = useState<string>(currentUser?.address || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(currentUser?.phone_number || "");
  const [imageUrl, setImageUrl] = useState<string>(currentUser?.profile_image_src || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [dob, setDob] = useState(currentUser?.dob || "");

  const genderOptions = [
    { label: t("sex_male_label"), value: "MALE" },
    { label: t("sex_female_label"), value: "FEMALE" },
    { label: "Not Specify", value: "NON" },
  ];

  const onGenderChange = ({ target: { value } }: RadioChangeEvent) => {
    console.log("Selected Gender: ", value);
    setSelectedGender(value);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    console.log(typeof date, typeof dateString);
  };

  const handleEditProfile = () => {
    const updateData = {
      first_name: name.fname,
      last_name: name.lname,
      gender: selectedGender,
      dob: dob,
      nationality: selectedNationality,
      phone_number: phoneNumber,
      address: address,
      email: email,
    };

    if (currentUser?.profile_image_src !== imageUrl) {
      console.log("Request Profile Change");
    }

    console.log(updateData);
  };

  const handleChangeProfileImage: UploadProps["onChange"] = (file) => {
    getBase64(file.file.originFileObj as FileType, (url) => {
      setImageUrl(url);
    });
  };

  useEffect(() => {
    navbarContext.setNavbarTitle(t("edit_profile_label"));
  }, [t, navbarContext]);

  if (!currentUser) {
    return <></>;
  }

  return (
    <div className="pb-32">
      <div className="flex flex-col items-center">
        {/* <div className="bg-[#D9D9D9] w-28 h-28 rounded-full flex flex-row items-center justify-center">
          <ImagePlus size={36} />
        </div> */}
        {/* {currentUser?.profile_image_src ? (
          <div className="relative">
            <Avatar size={96} src={currentUser?.profile_image_src} />
            <div className=" absolute right-0 bottom-0 rounded-full bg-[#136912] flex items-center justify-center p-2">
              <ImagePlus size={16} color="#fff" className="p-0 m-auto" />
            </div>
          </div>
        ) : (
          
        )} */}

        <div>
          <Upload
            name="avatar"
            listType="picture-circle"
            className="avatar-uploader"
            showUploadList={false}
            onChange={handleChangeProfileImage}
          >
            {imageUrl ? (
              <div className="relative">
                <Avatar size={102} icon={<UserIcon size={42} />} src={imageUrl} />
                <div className=" absolute right-0 bottom-0 rounded-full bg-[#136912] flex items-center justify-center p-2">
                  <Edit size={16} color="#fff" className="p-0 m-auto" />
                </div>
              </div>
            ) : (
              <div className="relative">
                <Avatar size={102} icon={<UserIcon size={42} />} />
                <div className=" absolute right-0 bottom-0 rounded-full bg-[#136912] flex items-center justify-center p-2">
                  <ImagePlus size={16} color="#fff" className="p-0 m-auto" />
                </div>
              </div>
            )}
          </Upload>
        </div>

        <div className="mt-6">
          <p className="m-0 ml-1 mb-3 font-bold">{t("name_label")}</p>
          <div className="flex flex-row gap-2">
            <Input
              className="h-12"
              size="large"
              placeholder={t("first_name_label")}
              value={name.fname}
              onChange={(event) => {
                setName({ ...name, fname: event.currentTarget.value });
              }}
            />
            <Input
              className="h-12"
              size="large"
              placeholder={t("last_name_label")}
              value={name.lname}
              onChange={(event) => {
                setName({ ...name, lname: event.currentTarget.value });
              }}
            />
          </div>
        </div>

        <div className="mt-6 w-full">
          <p className="m-0 ml-1 mb-3 font-bold">{t("dob_label")}</p>
          <DatePicker
            defaultValue={dayjs(String(dob), dateFormat)}
            format={dateFormat}
            className="w-full h-12"
            onChange={onChange}
          />
        </div>

        <div className="mt-6 w-full flex items-center gap-4">
          <p className="m-0 ml-1 font-bold">{t("gender_label")}</p>
          <Group
            size="large"
            className="w-full"
            defaultValue={selectedGender}
            options={genderOptions}
            onChange={onGenderChange}
            value={selectedGender}
            optionType="button"
            buttonStyle="solid"
          />
        </div>

        <div className="mt-6 w-full">
          <p className="m-0 ml-1 mb-3 font-bold">{t("nationality_label")}</p>
          <Select
            defaultValue="TH"
            className="w-full h-12"
            size="large"
            onChange={setSelectedNationality}
            value={selectedNationality}
            options={[
              { value: "TH", label: "Thai" },
              { value: "JP", label: "Japanese" },
            ]}
          />
        </div>

        <div className="mt-6 w-full">
          <p className="m-0 ml-1 mb-3 font-bold">{t("address_label")}</p>
          <TextArea
            placeholder={t("address_placeholder")}
            value={address}
            size="large"
            rows={4}
            onChange={(e) => setAddress(e.currentTarget.value)}
          />
        </div>

        <div className="mt-6 w-full">
          <p className="m-0 ml-1 mb-3 font-bold">{t("email_label")}</p>
          <Input
            className="h-12"
            size="large"
            value={email}
            placeholder={t("email_placeholder")}
            onChange={(event) => setEmail(event.currentTarget.value)}
            prefix={<Mail className="mr-2" />}
          />
        </div>

        <div className="mt-6 w-full">
          <p className="m-0 ml-1 mb-3 font-bold">{t("phone_number_label")}</p>
          <Input
            className="h-12"
            size="large"
            placeholder={t("phone_number_placeholder")}
            prefix={<Phone className="mr-2" />}
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.currentTarget.value)}
          />
        </div>

        <Button
          className="w-full font-bold mt-6 p-6 flex flex-row items-center justify-center"
          size="large"
          type="primary"
          onClick={handleEditProfile}
        >
          {t("done_button_label")}
        </Button>
      </div>
    </div>
  );
};

export default EditProfilePageClient;
