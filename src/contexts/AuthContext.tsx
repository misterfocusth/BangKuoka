"use client";

import { db, firebaseApp, initFirebase } from "@/app/config/firebaseConfig";
import { Organizer } from "@/app/types/organizer";
import { User } from "@/app/types/user";
import { ORGANIZERS } from "@/mock/organizers";
import { useRouter } from "@/navigation";
import { useCallback, useEffect, useState, createContext } from "react";

type UserType = "ORGANIZER" | "USER";

interface IAuthContext {
  currentUser: User | Organizer | null;
  login: (userType: UserType) => boolean;
  logout: (userType: UserType) => void;
}

const initialState: IAuthContext = {
  currentUser: null,
  login: (userType?: UserType) => {
    return true;
  },
  logout: (userType?: UserType) => {},
};

export const AuthContext = createContext<IAuthContext>(initialState);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentUser, setCurrentSession] = useState<User | Organizer | null>(null);

  const login = useCallback((userType: UserType = "USER") => {
    const session: User = {
      id: "1",
      first_name: "Sila",
      last_name: "Pakdeewong",
      gender: "MALE",
      dob: "18 December 2003",
      nationality: "TH",
      phone_number: "+6694-819-5617",
      profile_image_src: "https://avatars.githubusercontent.com/u/53871704?v=4",
      address:
        "School of Information Technology, KMITL, 1, Chalong Krung 1, Ladkrabang, Bangkok 10520",
      email: "sila.pak@xxxxx.com",
      interests: [],
      password: "",
      saved_events: ["1", "2"],
    };

    if (userType === "USER") {
      localStorage.setItem("currentUser", JSON.stringify(session));
      setCurrentSession(session);
    } else if (userType === "ORGANIZER") {
      localStorage.setItem("currentUser", JSON.stringify(ORGANIZERS[0]));
      setCurrentSession(ORGANIZERS[0]);
    }

    return true;
  }, []);

  const logout = useCallback(
    (userType: UserType = "USER") => {
      localStorage.clear();
      setCurrentSession(null);
      if (userType === "USER") {
        router.replace("/login");
      } else if (userType === "ORGANIZER") {
        router.replace("/organizer");
      }
      router.refresh();
    },
    [router]
  );

  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      const session: User = JSON.parse(localStorage.getItem("currentUser") || "");
      setCurrentSession(session);
    }

    initFirebase();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
