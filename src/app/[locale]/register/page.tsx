"use client";

// React
import React, { useContext, useState } from "react";

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
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/app/config/firebaseConfig";
import toast from "react-hot-toast";
import { AuthContext } from "@/contexts/AuthContext";
import { User } from "@/app/types/user";

const dateFormat = "DD MMMM YYYY";

const RegisterPage = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const t = useTranslations("Index");

  const [name, setName] = useState({
    firstName: "",
    lastName: "",
  });
  const [contact, setContact] = useState({
    phoneNumber: "",
    email: "",
    address: "",
  });
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");

  const [dob, setDob] = useState(dayjs());
  const [selectedGender, setSelectedGender] = useState<"MALE" | "FEMALE">("MALE");
  const [selectedNationality, setSelectedNationality] = useState<"TH" | "JP">("TH");
  const [isAcceptTerms, setIsAcceptTerms] = useState<Boolean>(false);

  const [isLoading, setIsLoading] = useState(false);

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
    setDob(date);
  };

  const validateFormData = () => {
    const formData = {
      first_name: name.firstName,
      last_name: name.lastName,
      gender: selectedGender,
      dob,
      nationality: selectedNationality,
      phone_number: contact.phoneNumber,
      email: contact.email,
      address: contact.address,
      password,
      cfPassword,
    };

    for (let key of Object.keys(formData)) {
      if (!formData[key as keyof typeof formData]) {
        console.log(key);
        return false;
      }
    }

    return true;
  };

  const handleRegister = async () => {
    setIsLoading(true);

    // validate
    const isUserInputValid = validateFormData();

    if (!isUserInputValid) {
      setIsLoading(false);
      toast.error("Error, invalid form data, or some fields missing.");
      return;
    } else if (password !== cfPassword) {
      setIsLoading(false);
      toast.error("Error, password mismatch");
      return;
    } else if (!isAcceptTerms) {
      setIsLoading(false);
      toast.error("Please accept terms & condition");
      return;
    }

    // data
    const newUserData = {
      first_name: name.firstName,
      last_name: name.lastName,
      gender: selectedGender,
      dob: dob.toDate(),
      nationality: selectedNationality,
      phone_number: contact.phoneNumber,
      email: contact.email,
      address: contact.address,
      interests: [],
      saved_events: [],
      password: password,
    };

    addDoc(collection(db, "users"), newUserData).then((result) => {
      setIsLoading(false);
      toast.success("Successfully, you can now login with your organizer account.");
      authContext.saveCurrentUser({ ...newUserData, id: result.id } as User);
      router.push("/landing/1");
    });
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
            <Input
              className="h-12"
              size="large"
              placeholder={t("first_name_label")}
              onChange={(e) => setName((prev) => ({ ...prev, firstName: e.currentTarget.value }))}
            />
            <Input
              className="h-12"
              size="large"
              placeholder={t("last_name_label")}
              onChange={(e) =>
                setName((prev) => ({
                  ...prev,
                  lastName: e.currentTarget.value,
                }))
              }
            />
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
            value={contact.address}
            onChange={(e) =>
              setContact((prev) => ({
                ...prev,
                address: e.currentTarget.value,
              }))
            }
          />
        </div>

        <div className="mt-6 w-full">
          <p className="m-0 ml-1 mb-3 font-bold">{t("email_label")}</p>
          <Input
            className="h-12"
            size="large"
            placeholder={t("email_placeholder")}
            prefix={<Mail className="mr-2" />}
            value={contact.email}
            onChange={(e) =>
              setContact((prev) => ({
                ...prev,
                email: e.currentTarget.value,
              }))
            }
          />
        </div>

        <div className="mt-6 w-full">
          <p className="m-0 ml-1 mb-3 font-bold">{t("phone_number_label")}</p>
          <Input
            className="h-12"
            size="large"
            placeholder={t("phone_number_placeholder")}
            prefix={<Phone className="mr-2" />}
            value={contact.phoneNumber}
            onChange={(e) =>
              setContact((prev) => ({
                ...prev,
                phoneNumber: e.currentTarget.value,
              }))
            }
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
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
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
            value={cfPassword}
            onChange={(e) => setCfPassword(e.currentTarget.value)}
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
          loading={isLoading}
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
