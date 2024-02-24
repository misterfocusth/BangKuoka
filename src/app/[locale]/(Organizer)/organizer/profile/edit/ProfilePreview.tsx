import GoogleMap from "@/components/GoogleMap";
import { Globe2, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface ProfilePreviewProps {
  name: string;
  description?: string;
  address: string;
  email?: string;
  phone_number?: string;
  website?: string;
  icon_image_src?: string;
  country?: string;
}

const ProfilePreview: FC<ProfilePreviewProps> = ({
  name,
  description,
  address,
  email,
  phone_number,
  website,
  icon_image_src,
  country,
}) => {
  return (
    <div>
      <div className="w-full shadow rounded-xl p-4">
        <div>
          <div className="flex flex-row items-center gap-4">
            <Image
              src={icon_image_src || ""}
              width="1920"
              height="1080"
              alt="organizer"
              className="w-20 h-20 rounded-full"
            />
            <div>
              <div className="font-semibold">{name}</div>
              <div className="flex flex-row items-center gap-1 mt-2">
                <MapPin />
                <div className="text-sm">
                  {country === "TH" ? "Bangkok, Thailand" : "Fukuoka, Japan"}
                </div>
              </div>
            </div>
          </div>

          <div className="text-[#555555] text-sm text-wrap mt-3">{description}</div>
        </div>
      </div>

      <div className="text-lg font-bold mt-6">{"Contact Information"}</div>
      <div className="text-[#555555] mt-1">
        {"You can use this information that provide by event organizer to contact with them."}
      </div>

      <div className="mt-6">
        <GoogleMap address={address} />
      </div>
      <div className=" leading-normal mt-6">{address}</div>

      <div className="mt-6 flex flex-col gap-4">
        {email && (
          <div className="flex items-start gap-3">
            <Mail color="#0068B2" />
            <div>
              <div className="text-[#0068B2] font-semibold">{"Email"}</div>
              <div className="mt-1 text-sm">{email}</div>
            </div>
          </div>
        )}

        {phone_number && (
          <div className="flex items-start gap-3">
            <Phone color="#0068B2" />
            <div>
              <div className="text-[#0068B2] font-semibold">{"Phone number"}</div>
              <div className="mt-1 text-sm">{phone_number}</div>
            </div>
          </div>
        )}

        {website && (
          <div className="flex items-start gap-3">
            <Globe2 color="#0068B2" />
            <div>
              <div className="text-[#0068B2] font-semibold">{"Website"}</div>
              <div
                className="mt-1 text-sm underline active:bg-slate-100 rounded-xl"
                onClick={() => {
                  window.open(website, "_blank", "noreferrer");
                }}
              >
                {website}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePreview;
