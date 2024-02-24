import { Organizer } from "./organizer";

export type Event = {
  id: string;
  event_name: string;
  event_image_src: string;
  category_id: number;
  description: string;
  start_date: Date;
  end_date: string;
  start_time: string;
  end_time: string;
  loc_name: string;
  loc_address: string;
  trans_bus?: string;
  trans_train?: string;
  trans_boat?: string;
  trans_taxi?: string;
  participant_num: number;
  is_allow_reserve: boolean;
  organizer_id: string;
  unlisted_on: string | null;
  country: "BKK" | "FK";
  views: number;
  is_limit_participant: boolean;

  organizer: Organizer;
};
