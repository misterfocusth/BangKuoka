"use client";

import { ChevronLeft } from "lucide-react";
import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRouter } from "@/navigation";

interface NavbarProps {
  title?: String;
  showLanguageSwitcher?: boolean;
  hidden?: boolean;
}
const Navbar: React.FC<NavbarProps> = ({
  title = "",
  showLanguageSwitcher = false,
  hidden = false,
}) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div>
      {!hidden && (
        <div className="flex flex-row items-center justify-between p-4 shadow">
          <ChevronLeft onClick={handleGoBack} />
          <p className="m-0 font-bold text-[#136912]">{title}</p>
          {showLanguageSwitcher ? <LanguageSwitcher /> : <div></div>}
        </div>
      )}
    </div>
  );
};

export default Navbar;
