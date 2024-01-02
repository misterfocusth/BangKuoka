"use client";

import React from "react";

// Image
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useTranslations } from "next-intl";
import { Button, Divider, Input } from "antd";
import { KeyRound, Mail } from "lucide-react";
import Password from "antd/es/input/Password";
import GoogleIcon from "@/components/icons/GoogleIcon";

const LoginPage = () => {
  const t = useTranslations("Index");

  return (
    <div className=" relative min-h-screen z-10">
      <div className="relative z-20">
        <Image
          className="w-full object-cover z-20"
          src={"/images/hero/hero_image_2.jpg"}
          alt="hero image"
          width={1920}
          height={300}
        />
        <div className=" absolute top-[20%] mx-auto text-white font-extrabold w-full text-center px-8">
          <p className="text-2xl mb-3">BangKuoka</p>
          <p className="text-sm">The best place for find events in Bangkok and Fukuoka.</p>
        </div>

        <div className=" absolute right-0 top-0 p-4">
          <LanguageSwitcher />
        </div>
      </div>

      <div className=" absolute w-full top-[32%] bg-white z-30 rounded-t-3xl p-8 shadow">
        <p className="text-2xl font-bold mb-3">{t("login_title")}</p>
        <p className=" text-[#555555]">{t("login_subtitle")}</p>

        <div className="flex flex-col gap-6 mt-12">
          <Input
            className="py-3"
            size="large"
            placeholder="Email"
            prefix={<Mail className="mr-2" />}
          />
          <Password
            className="py-3"
            size="large"
            placeholder="Password"
            prefix={<KeyRound className="mr-2" />}
            type="password"
          />
        </div>

        <p className=" text-right mt-6 pr-2 text-[#136912]">{t("forgot_password_label")}</p>

        <Button
          className="w-full font-bold mt-6 p-6 flex flex-row items-center justify-center"
          size="large"
          type="primary"
        >
          {t("login_button_title")}
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
          <p className="mb-2">{t("dont_have_account_label")}</p>
          <p className="font-bold text-[#136912]">{t("register_new_account")}</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
