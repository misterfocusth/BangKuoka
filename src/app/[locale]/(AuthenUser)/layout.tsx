"use client";

import BottomNavigation from "@/components/BottomNavigation";
import Navbar from "@/components/Navbar";
import NavbarContextProvider, { NavbarContext } from "@/contexts/NavbarContext";
import React, { useContext } from "react";

const AuthenUserLayout = ({ children }: { children: React.ReactNode }) => {
  const navbarContext = useContext(NavbarContext);
  navbarContext.setNavbarTitle("BangKuoka");

  return (
    <div>
      <Navbar
        title={navbarContext.title}
        showLanguageSwitcher={navbarContext.isShowLanguageSwitcher}
        hidden={!navbarContext.isShowNavbar}
      />
      <div className="p-6 min-h-screen">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default AuthenUserLayout;
