"use client";

import { NavbarContext } from "@/contexts/NavbarContext";
import { Select } from "antd";
import { Book, Coins, Landmark, Phone, TabletSmartphone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";

const TouristInfoPage = () => {
  const t = useTranslations("Index");
  const navbarContext = useContext(NavbarContext);

  const [selectedCountry, setSelectedCountry] = useState(0);

  useEffect(() => {
    navbarContext.setNavbarTitle(t("tourist_info_label"));
  }, [t, navbarContext]);
  return (
    <div className="mb-32">
      <div className="text-lg font-bold">{t("tourist_info_title")}</div>
      <div className="text-[#555555] mt-1">{t("tourist_info_subtitle")}</div>

      <div>
        <div className="font-semibold mt-6">{t("dest_country_label")}</div>
        <Select
          className="w-full h-12 mt-2"
          size="large"
          onChange={setSelectedCountry}
          value={selectedCountry}
          options={[
            { value: 0, label: t("bangkok_th_label") },
            { value: 1, label: t("fukuoka_jp_label") },
          ]}
        />
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-2 shadow rounded-xl p-4 active:bg-slate-100">
          <Book className="w-2/5" size={36} />
          <div className="flex flex-col items-start gap-1 ">
            <div className="font-semibold">{t("passport_visa_label")}</div>
            <div className="text-sm text-[#555555]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 shadow rounded-xl p-4 active:bg-slate-100">
          <Landmark className="w-2/5" size={36} />
          <div className="flex flex-col items-start gap-1 ">
            <div className="font-semibold">{t("customs_duty_label")}</div>
            <div className="text-sm text-[#555555]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 shadow rounded-xl p-4 active:bg-slate-100">
          <Coins className="w-2/5" size={36} />
          <div className="flex flex-col items-start gap-1 ">
            <div className="font-semibold">{t("vat_tax_label")}</div>
            <div className="text-sm text-[#555555]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center gap-2 shadow rounded-xl p-4 active:bg-slate-100">
          <TabletSmartphone className="w-2/5" size={36} />
          <div className="flex flex-col items-start gap-1 ">
            <div className="font-semibold">{t("mobile_internet_label")}</div>
            <div className="text-sm text-[#555555]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            </div>
          </div>
        </div>
      </div>

      <div className="text-lg font-bold mt-6">{t("emergency_contact_title")}</div>
      <div className="text-[#555555] mt-1">{t("emergency_contact_subtitle")}</div>

      <div className="mt-6">
        {selectedCountry === 0 ? (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-row items-center justify-start w-full gap-2 shadow pl-4 p-2 py-4 rounded-xl min-h-[12vh]">
              <Image
                width={1920}
                height={1080}
                src={"/images/tr_info/tr_info_thai/image 19.png"}
                className="w-16 h-auto"
                alt="emergency"
              />
              <div className="flex flex-col items-start gap-1">
                <div className="font-bold text-sm">TAT Call Center</div>
                <div className="text-sm text-[#555555] flex  flex-row items-center gap-1 font-semibold">
                  <Phone size={16} />
                  1672
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start w-full gap-2 shadow pl-4 p-2 py-4 rounded-xl min-h-[12vh]">
              <Image
                width={1920}
                height={1080}
                src={"/images/tr_info/tr_info_thai/image 20.png"}
                className=" w-12 h-auto"
                alt="emergency"
              />
              <div className="flex flex-col items-start gap-1">
                <div className="font-bold text-sm text-balance">Tourist Police</div>
                <div className="text-sm text-[#555555] flex  flex-row items-center gap-1 font-semibold">
                  <Phone size={16} />
                  1151
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start w-full gap-2 shadow pl-4 p-2 py-4 rounded-xl min-h-[12vh]">
              <Image
                width={1920}
                height={1080}
                src={"/images/tr_info/tr_info_thai/image 21.png"}
                className=" w-12 h-auto"
                alt="emergency"
              />
              <div className="flex flex-col items-start gap-1">
                <div className="font-bold text-sm text-balance">Ambulance</div>
                <div className="text-sm text-[#555555] flex  flex-row items-center gap-1 font-semibold">
                  <Phone size={16} />
                  1669
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start w-full gap-2 shadow pl-4 p-2 py-4 rounded-xl min-h-[12vh]">
              <Image
                width={1920}
                height={1080}
                src={"/images/tr_info/tr_info_thai/image 22.png"}
                className=" w-12 h-auto"
                alt="emergency"
              />
              <div className="flex flex-col items-start gap-1">
                <div className="font-bold text-sm text-balance">Fire Dept.</div>
                <div className="text-sm text-[#555555] flex  flex-row items-center gap-1 font-semibold">
                  <Phone size={16} />
                  199
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start w-full gap-2 shadow pl-4 p-2 py-4 rounded-xl min-h-[12vh]">
              <Image
                width={1920}
                height={1080}
                src={"/images/tr_info/tr_info_thai/image 23.png"}
                className=" w-12 h-auto"
                alt="emergency"
              />
              <div className="flex flex-col items-start gap-1">
                <div className="font-bold text-sm text-balance">Police Dept.</div>
                <div className="text-sm text-[#555555] flex  flex-row items-center gap-1 font-semibold">
                  <Phone size={16} />
                  191
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-row items-center justify-start pl-4 w-full gap-2 shadow p-2 py-4 rounded-xl min-h-[12vh]">
              <Image
                width={1920}
                height={1080}
                src={"/images/tr_info/tr_info_jp/image 19.png"}
                className="w-16 h-auto"
                alt="emergency"
              />
              <div className="flex flex-col items-start gap-1">
                <div className="font-bold text-sm">Japan Travel</div>
                <div className="text-sm text-[#555555] flex  flex-row items-center gap-1 font-semibold">
                  <Phone size={16} />
                  03-5369-3340
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start w-full gap-2 shadow p-2 pl-4 py-4 rounded-xl min-h-[12vh]">
              <Image
                width={1920}
                height={1080}
                src={"/images/tr_info/tr_info_jp/image 20.png"}
                className=" w-12 h-auto"
                alt="emergency"
              />
              <div className="flex flex-col items-start gap-1">
                <div className="font-bold text-sm text-balance">Thai Embessy</div>
                <div className="text-sm text-[#555555] flex  flex-row items-center gap-1 font-semibold">
                  <Phone size={16} />
                  (+81) 3 3222-4121
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start w-full gap-2 shadow p-2 pl-4 py-4 rounded-xl min-h-[12vh]">
              <Image
                width={1920}
                height={1080}
                src={"/images/tr_info/tr_info_jp/Rectangle 224.png"}
                className=" w-12 h-auto"
                alt="emergency"
              />
              <div className="flex flex-col items-start gap-1">
                <div className="font-bold text-sm text-balance">Police Dept.</div>
                <div className="text-sm text-[#555555] flex  flex-row items-center gap-1 font-semibold">
                  <Phone size={16} />
                  110
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start w-full gap-2 shadow p-2 pl-4 py-4 rounded-xl min-h-[12vh]">
              <Image
                width={1920}
                height={1080}
                src={"/images/tr_info/tr_info_jp/Rectangle 225.png"}
                className=" w-12 h-auto"
                alt="emergency"
              />
              <div className="flex flex-col items-start gap-1">
                <div className="font-bold text-sm text-balance">Fire Dept.</div>
                <div className="text-sm text-[#555555] flex  flex-row items-center gap-1 font-semibold">
                  <Phone size={16} />
                  119
                </div>
              </div>
            </div>

            <div className="flex flex-row items-center justify-start w-full gap-2 shadow p-2 pl-4 py-4 rounded-xl min-h-[12vh]">
              <Image
                width={1920}
                height={1080}
                src={"/images/tr_info/tr_info_jp/Rectangle 225.png"}
                className=" w-12 h-auto"
                alt="emergency"
              />
              <div className="flex flex-col items-start gap-1">
                <div className="font-bold text-sm text-balance">Ambulance</div>
                <div className="text-sm text-[#555555] flex  flex-row items-center gap-1 font-semibold">
                  <Phone size={16} />
                  119
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TouristInfoPage;
