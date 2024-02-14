"use client";

import { useState, createContext } from "react";

interface INavbarContext {
  setNavbarTitle: (title: String) => void;
  setShowNavbarState: (val: boolean) => void;
  setShowLanguageSwitcherState: (val: boolean) => void;
  title: String;
  isShowLanguageSwitcher: boolean;
  isShowNavbar: boolean;
}

const initialState: INavbarContext = {
  setNavbarTitle: (title: String) => {},
  setShowLanguageSwitcherState: (val: boolean) => {},
  setShowNavbarState: (val: boolean) => {},
  title: "",
  isShowLanguageSwitcher: true,
  isShowNavbar: true,
};

export const NavbarContext = createContext<INavbarContext>(initialState);

const NavbarContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [title, setTitle] = useState<String>("Test");
  const [isShowLanguageSwitcher, setIsShowLanguageSwitcher] = useState<boolean>(true);
  const [isShowNavbar, setIsShowNavbar] = useState<boolean>(true);

  const setNavbarTitle = (title: String) => setTitle(title);
  const setShowLanguageSwitcherState = (val: boolean) => setIsShowLanguageSwitcher(val);
  const setShowNavbarState = (val: boolean) => setIsShowNavbar(val);

  return (
    <NavbarContext.Provider
      value={{
        setNavbarTitle,
        setShowLanguageSwitcherState,
        setShowNavbarState,
        title,
        isShowLanguageSwitcher,
        isShowNavbar,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
};

export default NavbarContextProvider;
