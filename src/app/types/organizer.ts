export type Organizer = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  website: string;
  country: "TH" | "JP";
  address: string;
  description: string;
  password: string | null;
  event: string[];
  icon_image_src: string;
};
