export type Organizer = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  website: string;
  country: "TH" | "JP";
  address: string;
  description: string;
  credential_id: string | null;
  event: string[];
  icon_image_src: string;
};
