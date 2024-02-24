"use client";

// React
import React, { useState } from "react";

// Antd
import { Button, Checkbox, DatePicker, DatePickerProps, Divider, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import Password from "antd/es/input/Password";

// Lucide Icons
import { ImagePlus, KeyRound, Mail, Phone } from "lucide-react";

// Components
import Navbar from "@/components/Navbar";
import GoogleIcon from "@/components/icons/GoogleIcon";

// Next Intl
import { useTranslations } from "next-intl";

// dayjs
import dayjs from "dayjs";
import { Group, RadioChangeEvent } from "antd/es/radio";

// Navigation
import { useRouter } from "@/navigation";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/config/firebaseConfig";

const dateFormat = "DD MMMM YYYY";

const RegisterPage = () => {
  const router = useRouter();
  const t = useTranslations("Index");

  const [selectedGender, setSelectedGender] = useState<"MALE" | "FEMALE">("MALE");
  const [selectedNationality, setSelectedNationality] = useState<"TH" | "JP">("TH");
  const [address, setAddress] = useState<String>("");
  const [isAcceptTerms, setIsAcceptTerms] = useState<Boolean>(false);

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

  const handleRegister = async () => {
    router.push("/landing/1");
  };

  return (
    <div className="h-full min-h-screen">
      <Navbar title={t("register_new_account_label")} showLanguageSwitcher />

      <div className="flex flex-col items-center p-6">
        <div className="bg-[#D9D9D9] w-28 h-28 rounded-full flex flex-row items-center justify-center">
          <ImagePlus size={36} />
        </div>

        <div className="mt-6">
          <p className="m-0 ml-1 mb-3 font-bold">{t("name_label")}</p>
          <div className="flex flex-row gap-2">
            <Input className="h-12" size="large" placeholder={t("first_name_label")} />
            <Input className="h-12" size="large" placeholder={t("last_name_label")} />
          </div>
        </div>

        <div className="mt-6 w-full">
          <p className="m-0 ml-1 mb-3 font-bold">{t("dob_label")}</p>
          <DatePicker
            defaultValue={dayjs("18 December 2003", dateFormat)}
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
            placeholder={t("email_placeholder")}
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
          />
        </div>

        <div className="mt-6 w-full">
          <p className="m-0 ml-1 mb-3 font-bold">{t("password_holder")}</p>
          <Password
            className="py-3"
            size="large"
            placeholder={t("password_holder")}
            prefix={<KeyRound className="mr-2" />}
            type="password"
          />
        </div>

        <div className="mt-6 w-full">
          <p className="m-0 ml-1 mb-3 font-bold">{t("confirm_password")}</p>
          <Password
            className="py-3"
            size="large"
            placeholder={t("confirm_password")}
            prefix={<KeyRound className="mr-2" />}
            type="password"
          />
        </div>

        <div className="mt-6 ml-1">
          <Checkbox
            onChange={(e) => {
              setIsAcceptTerms(e.target.checked);
            }}
            className="flex items-center gap-1.5"
          >
            By checking this button, I agree to <span className="font-bold">BangKuoka</span>&apos;s{" "}
            <span className="underline">Terms of Use</span> and{" "}
            <span className="underline">Privacy Policy</span>
          </Checkbox>
        </div>

        <Button
          className="w-full font-bold mt-6 p-6 flex flex-row items-center justify-center"
          size="large"
          type="primary"
          onClick={handleRegister}
        >
          {t("register_new_account_label")}
        </Button>

        <Divider className="mt-6">{t("continue_with_label")}</Divider>

        <Button
          className="w-full font-bold mt-6 p-6 flex flex-row items-center justify-center"
          size="large"
          type="default"
          icon={<GoogleIcon />}
        >
          {t("continue_with_google_label")}
        </Button>

        <div className="text-center mt-8">
          <p className="mb-2">{t("already_have_an_account_label")}</p>
          <p
            className="font-bold text-[#136912]"
            onClick={() => {
              router.push("/login");
            }}
          >
            {t("login_to_your_account_label")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
