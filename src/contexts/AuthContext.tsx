"use client";

import { Organizer } from "@/app/types/organizer";
import { User } from "@/app/types/user";
import { useRouter } from "@/navigation";
import { useCallback, useEffect, useState, createContext } from "react";

interface IAuthContext {
  currentUser: User | Organizer | null;
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
  const [currentUser, setCurrentSession] = useState<User | Organizer | null>(null);

  const getUserSession = useCallback(() => {
    if (localStorage.getItem("currentUser")) {
      const session: User = JSON.parse(localStorage.getItem("currentUser") || "");
      setCurrentSession(session);
    }
  }, []);

  const login = useCallback(() => {
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

    localStorage.setItem("currentUser", JSON.stringify(session));
    setCurrentSession(session);
    return true;
  }, []);

  const logout = useCallback(() => {
    localStorage.clear();
    router.replace("/login");
    router.refresh();
  }, [router]);

  useEffect(() => {
    getUserSession();
  }, [getUserSession]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
