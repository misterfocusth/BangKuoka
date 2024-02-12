"use client";

import Navbar from "@/components/Navbar";
import { Button } from "antd";
import Image from "next/image";
import React from "react";

import { useRouter } from "@/navigation";

const LandingOnePage = () => {
  const router = useRouter();

  return (
    <div className="p-6 min-h-screen grid place-items-center h-screen">
      <div>
        <div className="flex justify-center items-center mx-auto">
          <Image
            src={"/images/landing/pin 1.png"}
            width={1920}
            height={1080}
            className=" w-72 h-72"
            alt="landing"
          />
        </div>

        <div className="text-center mt-20 text-pretty">
          <p className="text-2xl font-bold mb-3">Find event that you interest</p>
          <p className=" text-[#555555] leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          </p>
        </div>

        <div className="text-center flex flex-col gap-2 mt-16">
          <Button
            className="w-full font-bold mt-6 p-6 flex flex-row items-center justify-center"
            size="large"
            type="primary"
            onClick={() => {
              router.push("2");
            }}
          >
            {"Continue"}
          </Button>
          <Button
            type="text"
            size="large"
            onClick={() => {
              router.push("/home");
            }}
          >
            skip for now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingOnePage;
