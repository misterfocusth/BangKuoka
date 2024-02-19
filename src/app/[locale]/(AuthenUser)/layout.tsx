"use client";

import BottomNavigation from "@/components/BottomNavigation";
import Navbar from "@/components/Navbar";
import { AuthContext } from "@/contexts/AuthContext";
import { NavbarContext } from "@/contexts/NavbarContext";
import withAuth from "@/hooks/protectedRoute/withAuth";
import { useRouter } from "@/navigation";
import React, { useContext, useEffect } from "react";

const AuthenUserLayout = ({ children }: { children: React.ReactNode }) => {
  const navbarContext = useContext(NavbarContext);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authContext.currentUser?.id) router.replace("/login");
  }),
    [];

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
