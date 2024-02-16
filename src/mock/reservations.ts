import { Reservation } from "@/app/types/reservation";
import { Session } from "@/contexts/AuthContext";
import { EVENTS } from "./events";

const currentUser: Session = {
  id: "1",
  first_name: "Sila",
  last_name: "Pakdeewong",
  gender: "MALE",
  dob: "18 December 2003",
  nationality: "Thai",
  phone_number: "+6665-652-6769",
  address: "School of Information Technology, KMITL, 1, Chalong Krung 1, Ladkrabang, Bangkok 10520",
  email: "sila.pak@outlook.com",
  interests: [],
  saved_events: [],
};

export const RESERVATIONS: Reservation[] = [
  {
    id: "1",
    user_id: "1",
    user: currentUser,
    event_id: "2",
    event: EVENTS[1],
    status_id: 0,
    reserve_on: new Date("2023-02-10 11:13:00"),
    ticket_amount: 1,
  },
  {
    id: "1",
    user_id: "1",
    user: currentUser,
    event_id: "1",
    event: EVENTS[0],
    status_id: 1,
    reserve_on: new Date("2023-02-10 11:13:00"),
    ticket_amount: 1,
  },
  {
    id: "1",
    user_id: "1",
    user: currentUser,
    event_id: "2",
    event: EVENTS[1],
    status_id: 2,
    reserve_on: new Date("2023-02-10 11:13:00"),
    ticket_amount: 1,
  },
];
