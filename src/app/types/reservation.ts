import { Session } from "@/contexts/AuthContext";
import { Event } from "./event";

export type Reservation = {
  id: string;
  user_id: string;
  user?: Session | null;
  event_id: string;
  event?: Event | null;
  status_id: number;
  reserve_on: Date;
  canceled_on?: Date | null;
  ticket_amount: number;
};
