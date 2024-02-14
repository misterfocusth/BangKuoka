import { useRouter } from "@/navigation";
import { BookMarked, CalendarCheck, Home, UserRound } from "lucide-react";
import React, { useEffect, useState } from "react";

const BottomNavigation = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<number>(0);
  const tabs = ["/home", "/reservation", "/saved", "/profile"];

  const handleTabChange = (targetTab: number) => {
    router.push(tabs[targetTab]);
    setCurrentTab(targetTab);
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (currentPath.includes("/home")) {
      setCurrentTab(0);
    } else if (currentPath.includes("/reservation")) {
      setCurrentTab(1);
    } else if (currentPath.includes("/saved")) {
      setCurrentTab(2);
    } else if (currentPath.includes("profile")) {
      setCurrentTab(3);
    }
  }, []);

  return (
    <div className="p-4 border-t px-12 flex items-center justify-between fixed bottom-0 w-full">
      <div onClick={() => handleTabChange(0)}>
        {currentTab == 0 ? (
          <div className="flex items-center gap-2 bg-green-100 py-2 rounded-xl px-4">
            <Home color="#136912" />
            <p className="m-0 text-[#136912]">Home</p>
          </div>
        ) : (
          <Home />
        )}
      </div>

      <div onClick={() => handleTabChange(1)}>
        {currentTab == 1 ? (
          <div className="flex items-center gap-2 bg-green-100 py-2 rounded-xl px-4">
            <CalendarCheck color="#136912" />
            <p className="m-0 text-[#136912]">Reservation</p>
          </div>
        ) : (
          <CalendarCheck />
        )}
      </div>

      <div onClick={() => handleTabChange(2)}>
        {currentTab == 2 ? (
          <div className="flex items-center gap-2 bg-green-100 py-2 rounded-xl px-4">
            <BookMarked color="#136912" />
            <p className="m-0 text-[#136912]">Saved</p>
          </div>
        ) : (
          <BookMarked />
        )}
      </div>

      <div onClick={() => handleTabChange(3)}>
        {currentTab == 3 ? (
          <div className="flex items-center gap-2 bg-green-100 py-2 rounded-xl px-4 hover:shadow">
            <UserRound color="#136912" />
            <p className="m-0 text-[#136912]">Profile</p>
          </div>
        ) : (
          <UserRound />
        )}
      </div>
    </div>
  );
};

export default BottomNavigation;
