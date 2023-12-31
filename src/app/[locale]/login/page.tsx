"use client";

import React from "react";

// Image
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const LoginPage = () => {
  return (
    <div>
      <div className="relative">
        <Image
          className="w-full object-cover"
          src={"/images/hero/hero_image.jpg"}
          alt="hero image"
          width={1920}
          height={300}
        />
        <div className=" absolute top-[35%] mx-auto text-white font-extrabold w-full text-center px-8">
          <p className="text-2xl mb-3">BangKuoka</p>
          <p className="text-sm">The best place for find events in Bangkok and Fukuoka.</p>
        </div>

        <div className=" absolute right-0 top-0 p-4">
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
