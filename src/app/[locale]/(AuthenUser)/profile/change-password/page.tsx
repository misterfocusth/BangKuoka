"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { NavbarContext } from "@/contexts/NavbarContext";
import { Button } from "antd";
import Password from "antd/es/input/Password";
import { KeyRound } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";

const ChangePasswordPage = () => {
  const authContext = useContext(AuthContext);
  const navbarContext = useContext(NavbarContext);
  const t = useTranslations("Index");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = () => {};

  useEffect(() => {
    navbarContext.setNavbarTitle(t("change_password_label"));
  }, [t, navbarContext]);

  useEffect(() => {}, []);
  return (
    <div>
      <div className="mt-2 w-full">
        <p className="m-0 ml-1 mb-3 font-bold">{t("old_password_label")}</p>
        <Password
          className="py-3"
          size="large"
          placeholder={t("old_password_label")}
          prefix={<KeyRound className="mr-2" />}
          type="password"
        />
      </div>

      <div className="mt-6 w-full">
        <p className="m-0 ml-1 mb-3 font-bold">{t("new_password_label")}</p>
        <Password
          className="py-3"
          size="large"
          placeholder={t("confirm_password")}
          prefix={<KeyRound className="mr-2" />}
          type="password"
        />
      </div>

      <div className="mt-6 w-full">
        <p className="m-0 ml-1 mb-3 font-bold">{t("confirm_new_password_label")}</p>
        <Password
          className="py-3"
          size="large"
          placeholder={t("confirm_new_password_label")}
          prefix={<KeyRound className="mr-2" />}
          type="password"
        />
      </div>

      <Button
        className="w-full font-bold mt-6 p-6 flex flex-row items-center justify-center"
        size="large"
        type="primary"
        onClick={handleChangePassword}
      >
        {t("done_button_label")}
      </Button>
    </div>
  );
};

export default ChangePasswordPage;
