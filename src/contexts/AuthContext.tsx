"use client";

import { useRouter } from "@/navigation";
import { useCallback, useEffect, useState, createContext } from "react";
import { db } from "@/app/config/firebaseConfig";
import { collection, getDoc, getDocs } from "firebase/firestore";

export type Session = {
  id: string;
  first_name: String;
  last_name: String;
  dob: String;
  gender: String;
  nationality: String;
  phone_number: String;
  email: String;
  interests?: String[];
  profile_image_src?: String;
  address: String;
  credential_id?: String;
  saved_events?: String[];
};

interface IAuthContext {
  currentUser: Session | null;
  login: () => boolean;
  logout: () => void;
}

const initialState: IAuthContext = {
  currentUser: null,
  login: () => {
    return true;
  },
  logout: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialState);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentUser, setCurrentSession] = useState<Session | null>(null);

  const login = useCallback(() => {
    const session: Session = {
      id: "1",
      first_name: "Sila",
      last_name: "Pakdeewong",
      gender: "MALE",
      dob: "18 December 2003",
      nationality: "Thai",
      phone_number: "+6665-652-6769",
      address:
        "School of Information Technology, KMITL, 1, Chalong Krung 1, Ladkrabang, Bangkok 10520",
      email: "sila.pak@outlook.com",
      interests: [],
      saved_events: ["1", "2"],
    };
    localStorage.setItem("currentUser", JSON.stringify(session));
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("currentUser");
    router.push("login");
    router.refresh();
  }, [router]);

  useEffect(() => {
    const session: Session = JSON.parse(localStorage.getItem("currentUser") || "{}");
    setCurrentSession(session);
    alert(JSON.stringify(session));
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
