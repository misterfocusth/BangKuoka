"use client";

import { db, firebaseApp, initFirebase } from "@/app/config/firebaseConfig";
import { Organizer } from "@/app/types/organizer";
import { User } from "@/app/types/user";
import { ORGANIZERS } from "@/mock/organizers";
import { usePathname, useRouter } from "@/navigation";
import { useCallback, useEffect, useState, createContext, Dispatch, SetStateAction } from "react";

type UserType = "ORGANIZER" | "USER";

interface IAuthContext {
  setCurrentUser: Dispatch<SetStateAction<User | Organizer | null>>;
  currentUser: User | Organizer | null;
  saveCurrentUser: (data: User | Organizer, userId?: string) => void;
  logout: (userType: UserType) => void;
  isSessionLoading: boolean;
}

const initialState: IAuthContext = {
  setCurrentUser: () => {},
  currentUser: null,
  isSessionLoading: false,
  saveCurrentUser: (data: User | Organizer, userId?: string) => {},
  logout: (userType?: UserType) => {},
};

export const AuthContext = createContext<IAuthContext>(initialState);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [isSessionLoading, setIsSessionLoading] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | Organizer | null>(null);

  const saveCurrentUser = useCallback((data: User | Organizer, userId: string = "") => {
    setCurrentUser({ ...data, id: userId });
    localStorage.setItem("currentUser", JSON.stringify({ ...data, id: userId }));
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
      const session = JSON.parse(localStorage.getItem("currentUser") || "");
      setCurrentUser(session);
      if (session.website) {
        router.replace(pathname === "/organizer" ? "/organizer/dashboard" : pathname);
      } else if (session.email) {
        router.replace(pathname === "/login" ? "/home" : pathname);
      }
    } else {
      setIsSessionLoading(false);
    }

    initFirebase();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isSessionLoading, setCurrentUser, currentUser, saveCurrentUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
