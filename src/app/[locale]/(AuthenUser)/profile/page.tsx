"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { NavbarContext } from "@/contexts/NavbarContext";
import { useRouter } from "@/navigation";
import { Avatar, Button } from "antd";
import {
  BookMarked,
  CalendarCheck,
  ImagePlus,
  Info,
  KeyRound,
  LogOut,
  User,
  UserRoundCog,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect } from "react";

const ProfilePage = () => {
  const t = useTranslations("Index");
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const navbarContext = useContext(NavbarContext);

  useEffect(() => {
    navbarContext.setNavbarTitle(t("my_profile_label"));
  }, [navbarContext, t]);

  return (
    <div>
      <div className="flex items-center gap-6">
        {authContext.currentUser?.profile_image_src ? (
          <Avatar size={96} src={authContext.currentUser?.profile_image_src} />
        ) : (
          <Avatar size={96} icon={<User size={42} />} />
        )}
        <div className="flex flex-col gap-1">
          <div className=" font-semibold text-lg">
            {authContext.currentUser?.first_name + " " + authContext.currentUser?.last_name}
          </div>
          <div className="text-[#136912]">
            {authContext.currentUser?.nationality === "TH"
              ? t("bangkok_th_label")
              : t("fukuoka_jp_label")}
          </div>
        </div>
      </div>

      <div className="mt-6 cursor-pointer  flex flex-col gap-4">
        <div
          className="flex flex-row items-center gap-2 shadow p-6 rounded-xl active:bg-slate-100"
          onClick={() => router.push("/profile/edit")}
        >
          <UserRoundCog />
          <div>{t("edit_profile_label")}</div>
        </div>

        <div
          className="flex flex-row items-center gap-2 shadow p-6 rounded-xl active:bg-slate-100"
          onClick={() => router.push("/profile/change-password")}
        >
          <KeyRound />
          <div>{t("change_password_label")}</div>
        </div>

        <div
          className="flex flex-row items-center gap-2 shadow p-6 rounded-xl active:bg-slate-100"
          onClick={() => router.push("/saved")}
        >
          <BookMarked />
          <div>{t("my_saved_events_label")}</div>
        </div>

        <div
          className="flex flex-row items-center gap-2 shadow p-6 rounded-xl active:bg-slate-100"
          onClick={() => router.push("/reservation")}
        >
          <CalendarCheck />
          <div>{t("my_reservation_title")}</div>
        </div>

        <div className="flex flex-row items-center gap-2 shadow p-6 rounded-xl active:bg-slate-100">
          <Info />
          <div>{t("tourist_info_label")}</div>
        </div>
      </div>

      <Button
        type="primary"
        danger
        size="large"
        className="flex items-center w-full justify-center mt-6"
        icon={<LogOut size={18} />}
        onClick={() => {
          authContext.logout();
        }}
      >
        {t("logout_label")}
      </Button>
    </div>
  );
};

export default ProfilePage;
