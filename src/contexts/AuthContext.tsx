"use client";

import { db, firebaseApp, initFirebase } from "@/app/config/firebaseConfig";
import { Organizer } from "@/app/types/organizer";
import { User } from "@/app/types/user";
import { ORGANIZERS } from "@/mock/organizers";
import { useRouter } from "@/navigation";
import { useCallback, useEffect, useState, createContext, Dispatch, SetStateAction } from "react";

type UserType = "ORGANIZER" | "USER";

interface IAuthContext {
  setCurrentUser: Dispatch<SetStateAction<User | Organizer | null>>;
  currentUser: User | Organizer | null;
  saveCurrentUser: (data: User | Organizer) => void;
  logout: (userType: UserType) => void;
}

const initialState: IAuthContext = {
  setCurrentUser: () => {},
  currentUser: null,
  saveCurrentUser: (data: User | Organizer) => {},
  logout: (userType?: UserType) => {},
};

export const AuthContext = createContext<IAuthContext>(initialState);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | Organizer | null>(null);

  const saveCurrentUser = useCallback((data: User | Organizer) => {
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

    // if (userType === "USER") {
    //   localStorage.setItem("currentUser", JSON.stringify(session));
    //   setCurrentUser(session);
    // } else if (userType === "ORGANIZER") {
    //   localStorage.setItem("currentUser", JSON.stringify(ORGANIZERS[0]));
    //   setCurrentUser(ORGANIZERS[0]);
    // }

    setCurrentUser(data);
    localStorage.setItem("currentUser", JSON.stringify(data));

    return true;
  }, []);

  const logout = useCallback(
    (userType: UserType = "USER") => {
      localStorage.clear();
      setCurrentUser(null);
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
      setCurrentUser(session);
    }

    initFirebase();
  }, []);

  return (
    <AuthContext.Provider value={{ setCurrentUser, currentUser, saveCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
