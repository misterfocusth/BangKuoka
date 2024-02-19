"use client";

import { Organizer } from "@/app/types/organizer";
import OrganizerCard from "@/components/OrganizerCard";
import { AuthContext } from "@/contexts/AuthContext";
import { NavbarContext } from "@/contexts/NavbarContext";
import { ORGANIZERS } from "@/mock/organizers";
import { useRouter } from "@/navigation";
import { AutoComplete, Input, Select } from "antd";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useContext, useEffect, useState } from "react";

interface OrganizersPageClientProps {
  organizers: Organizer[];
}

const OrganizersPageClient: React.FC<OrganizersPageClientProps> = ({ organizers }) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const navbarContext = useContext(NavbarContext);
  const t = useTranslations("Index");

  const [organizerLists, setOrganizersList] = useState<Organizer[]>(organizers);
  const [organizersLocation, setOrganizersLocation] = useState("0");
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState<{ value: string }[]>([]);

  const getPanelValue = (searchText: string) =>
    !searchText
      ? []
      : organizers
          .filter((organizer) => organizer.name.includes(searchText))
          .map((organizer) => ({ value: organizer.name }));

  const onSelect = (data: string) => {
    console.log("onSelect", data);
  };

  useEffect(() => {
    navbarContext.setNavbarTitle(t("organizers_label"));
  }, [t, navbarContext]);
  return (
    <div className="pb-32">
      <div className="text-lg font-bold">{t("organizers_title")}</div>
      <div className="text-[#555555] mt-1">{t("organizers_subtitle")}</div>

      <div>
        <div className="font-semibold mt-8">{t("search_organizer_label")}</div>
        <AutoComplete
          options={options}
          className="h-12 mt-2 w-full"
          onSelect={onSelect}
          onSearch={(text: string) => {
            setOptions(getPanelValue(text));
            setSearchValue(text);
            if (!text) {
              setOrganizersList(organizers);
            } else {
              setOrganizersList(organizers.filter((o) => o.name.includes(text)));
            }

            if (organizersLocation === "1") {
              setOrganizersList((prev) => prev.filter((o) => o.country === "TH"));
            }
          }}
          placeholder={t("search_organizer_placeholder")}
        />
      </div>

      <div>
        <div className="font-semibold mt-4">{t("location_label")}</div>
        <Select
          className="w-full h-12 mt-2"
          size="large"
          onChange={(value) => {
            if (value === "0") {
              setOrganizersList(organizers);
            } else if (value === "1") {
              setOrganizersList(organizers.filter((o) => o.country === "TH"));
            } else if (value === "2") {
              setOrganizersList(organizers.filter((o) => o.country === "JP"));
            }

            if (searchValue) {
              setOrganizersList((prev) => prev.filter((o) => o.name.includes(searchValue)));
            }
            setOrganizersLocation(value);
          }}
          value={organizersLocation}
          options={[
            { value: "0", label: t("location_select_placeholder") },
            { value: "1", label: t("bangkok_th_label") },
            { value: "2", label: t("fukuoka_jp_label") },
          ]}
        />
      </div>

      <div className="w-full flex flex-col gap-4 mt-6">
        {organizerLists.map((o) => (
          <OrganizerCard
            key={o.id}
            id={o.id}
            name={o.name}
            description={o.description}
            image_src={o.icon_image_src}
            country={o.country}
          />
        ))}
      </div>
    </div>
  );
};

export default OrganizersPageClient;
