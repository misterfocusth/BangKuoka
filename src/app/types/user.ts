export type User = {
  id: string;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: "MALE" | "FEMALE";
  nationality: "TH" | "JP";
  phone_number: string;
  email: string;
  interests?: string[];
  profile_image_src?: string;
  address: string;
  credential_id?: string;
  saved_events?: string[];
  password: string;
};
