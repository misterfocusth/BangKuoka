import { useRouter } from "@/navigation";
import { Image } from "antd";
import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface OrganizerCardProps {
  image_src: string;
  name: string;
  description: string;
  country: "TH" | "JP";
  id: string;
}

const OrganizerCard: React.FC<OrganizerCardProps> = ({
  image_src,
  name,
  description,
  country,
  id,
}) => {
  const router = useRouter();
  const t = useTranslations("Index");

  return (
    <div onClick={() => router.push("/organizer/" + id)} className="w-full shadow rounded-xl p-4">
      <div className="flex flex-row items-center gap-4">
        <Image src={image_src} width="1920" height="1080" alt="organizer" className="w-20" />
        <div>
          <div className="font-semibold">{name}</div>
          <div className="text-[#555555] text-sm text-wrap mt-1">
            {description.substring(0, 100)}
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center mt-4">
        <div className="flex flex-row items-center gap-1">
          <MapPin />
          <div className="text-sm">
            {country === "TH" ? t("bangkok_th_label") : t("fukuoka_jp_label")}
          </div>
        </div>

        <div className="text-[#0068B2] font-semibold text-sm">
          {t("view_organizer_profile_label")}
        </div>
      </div>
    </div>
  );
};

export default OrganizerCard;
