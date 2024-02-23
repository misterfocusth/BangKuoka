"use client";

import { useRouter } from "@/navigation";
import { Button } from "antd";
import { ChevronLeft, Edit, Settings } from "lucide-react";
import React from "react";

const CreateEventPage = () => {
  const router = useRouter();

  const handleCreateNewEvent = () => {};
  return (
    <div>
      <div className="flex flex-row items-center justify-between gap-2  mb-6">
        <div className="flex flex-row items-center gap-2 text-xl font-bold">
          <Edit />
          Create Event
        </div>

        <div className="flex items-center gap-4">
          <Button
            size="large"
            type="default"
            className="flex items-center gap-1"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            size="large"
            type="primary"
            className="flex items-center gap-1"
            onClick={handleCreateNewEvent}
          >
            Save & Create Event
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
