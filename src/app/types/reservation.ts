import { Event } from "./event";
import { User } from "./user";

export type Reservation = {
  id: string;
  user_id: string;
  user?: User | null;
  event_id: string;
  event?: Event | null;
  status_id: number;
  reserve_on: Date;
  canceled_on?: Date | null;
  ticket_amount: number;
};
