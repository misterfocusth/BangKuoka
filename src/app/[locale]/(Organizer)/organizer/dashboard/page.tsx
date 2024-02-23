"use client";

import { Organizer } from "@/app/types/organizer";
import { AuthContext } from "@/contexts/AuthContext";
import { EVENTS } from "@/mock/events";
import React, { useContext, useEffect, useState } from "react";
import OrganizerEventTable from "./OrganizerEventTable";
import { CalendarDays, Edit, Settings } from "lucide-react";
import { Button, Input, Select } from "antd";
import { useRouter } from "@/navigation";

const OrganizerDashboardPage = () => {
  const router = useRouter();
  const currentUser = useContext(AuthContext).currentUser as Organizer;
  const [events, setEvents] = useState(
    EVENTS.filter((e) => e?.organizer_id == currentUser?.id) || []
  );

  const [searchValue, setSearchValue] = useState("");
  const [sortingOption, setSortingOption] = useState<"ASD" | "DESC">("ASD");

  useEffect(() => {
    setEvents(EVENTS.filter((e) => e?.organizer_id == currentUser?.id) || []);
  }, [currentUser]);

  if (!events) return <></>;

  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-2  mb-6">
        <div className="flex flex-row items-center gap-2 text-xl font-bold">
          <Settings />
          Manage your events
        </div>

        <div className="flex items-center gap-4">
          <Input
            className=" h-10 w-80"
            size="large"
            value={searchValue}
            placeholder={"Search using event name."}
            onChange={(e) => setSearchValue(e.currentTarget.value)}
          />
          <Select
            defaultValue="ASD"
            className=" h-10"
            size="large"
            onChange={setSortingOption}
            value={sortingOption}
            options={[
              { value: "ASD", label: "newest to oldest" },
              { value: "DESC", label: "oldest to newest" },
            ]}
          />
          <Button
            size="large"
            type="primary"
            className="flex items-center gap-1"
            onClick={() => router.push("/organizer/event/create")}
          >
            <Edit size={16} />
            Create Event
          </Button>
        </div>
      </div>
      <OrganizerEventTable
        dataSource={events}
        searchValue={searchValue}
        sortingOption={sortingOption}
      />
    </div>
  );
};

export default OrganizerDashboardPage;
