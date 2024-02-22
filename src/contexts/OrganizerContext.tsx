"use client";

import { Organizer } from "@/app/types/organizer";

interface IOrganizerAuthContext {
  currentUser: Organizer;
  login: () => void;
  logout: () => void;
}
