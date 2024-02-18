import { Event } from "@/app/types/event";
import { ORGANIZERS } from "./organizers";

export const EVENTS: Event[] = [
  {
    id: "1",
    event_name: "Popular Events",
    event_image_src: "https://picsum.photos/1920/1080?random=1",
    category_id: 1,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start_date: new Date("2024-12-16 18:00:00"),
    end_date: "20 Dec 2024",
    start_time: "18.00",
    end_time: "20.00",
    loc_name: "Bangkok",
    loc_address: "Bangkok",
    trans_bus: "A21",
    trans_train: "Bangkok Station",
    trans_boat: "AAA",
    trans_taxi: "2111",
    participant_num: 250,
    is_allow_reserve: true,
    organizer_id: "01",
    unlisted_on: null,
    organizer: ORGANIZERS[0],
    country: "BKK",
  },
  {
    id: "2",
    event_name: "Photo exhibition “Mitsuaki Iwago’s Japanese cat walk”",
    event_image_src: "https://picsum.photos/1920/1080?random=2",
    category_id: 2,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    start_date: new Date("2024-12-17 18:00:00"),
    end_date: "20 Dec 2024",
    start_time: "18.00",
    end_time: "20.00",
    loc_name: "Bangkok City Hall (Sao Chingcha)",
    loc_address:
      "Bangkok City Hall (Sao Chingcha) 73 Dinso Road , Phra Nakhon District Bangkok 10200, Thailand",
    trans_bus: "A21",
    trans_train: "Bangkok Station",
    trans_boat: "AAA",
    trans_taxi: "2111",
    participant_num: 100,
    is_allow_reserve: true,
    organizer_id: "01",
    unlisted_on: null,
    organizer: ORGANIZERS[1],
    country: "FK",
  },
];
