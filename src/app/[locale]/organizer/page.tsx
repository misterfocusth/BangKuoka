"use client";

import { db } from "@/app/config/firebaseConfig";
import { Organizer } from "@/app/types/organizer";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "@/navigation";
import { Button, Input } from "antd";
import Password from "antd/es/input/Password";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { KeyRound, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const OrganizerPage = () => {
  const t = useTranslations("Index");
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("bangkok@bangkok.go.th");
  const [password, setPassword] = useState("123456789");

  useEffect(() => {
    const currentUser = authContext.currentUser as Organizer;
    console.log(currentUser);
    if (currentUser && currentUser.name) {
      router.replace("/organizer/dashboard");
    } else {
      setIsLoading(false);
    }
  }, [authContext.currentUser, router]);

  if (isLoading) {
    return <></>;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("Please provide your organizer email and password.");
      return;
    }

    const organizerRef = collection(db, "organizers");
    const q = query(organizerRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      toast.error("Invalid credentials.");
      return;
    }

    const savedPassword = querySnapshot.docs[0].data().password;

    if (password !== savedPassword) {
      toast.error("Invalid credentials.");
      return;
    }

    const organizer = querySnapshot.docs[0].data();
    authContext.saveCurrentUser(organizer as Organizer, querySnapshot.docs[0].id);
    toast.success(`LoggedIn, Welcome back ${organizer.name}`);
    router.replace("/organizer/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0068B2] grid grid-cols-2">
      <div className="flex flex-col h-full items-center justify-center">
        <Image
          src={"/images/BangKuoka.png"}
          width={1920}
          height={1080}
          className="w-auto h-52"
          alt="Logo"
        />
        <div className="text-3xl text-white font-extrabold">BangKuoka</div>
      </div>
      <div className="w-full flex flex-col items-start justify-center">
        <div>
          <div className="text-white text-3xl font-bold">{t("welcome_title")}</div>
          <div className="text-lg text-white mt-1">{t("organizer_login_subtitle")}</div>

          <div className="mt-12">
            <Input
              className="py-3"
              size="large"
              placeholder={t("email_label")}
              prefix={<Mail className="mr-2" />}
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <Password
              className="py-3 mt-4"
              size="large"
              placeholder={t("password_label")}
              prefix={<KeyRound className="mr-2" />}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>

          <div className="mt-6 font-semibold underline text-white cursor-pointer">
            {t("forgot_password_label")}
          </div>

          <Button
            size="large"
            className="w-full font-bold mt-12 p-6 flex flex-row items-center justify-center"
            onClick={handleLogin}
            loading={isLoading}
          >
            {t("login_title")}
          </Button>

          <div className="mt-6 text-white">
            {t("dont_have_account_label")}{" "}
            <span
              className=" underline font-semibold cursor-pointer text-white"
              onClick={() => {
                router.push("/organizer/register");
              }}
            >
              {t("register_new_account_label")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerPage;
