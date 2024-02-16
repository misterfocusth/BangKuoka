import { Button, Tooltip } from "antd";
import { Bookmark } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface SaveEventButtonProps {
  isUserSaveEvent?: boolean;
}
const SaveEventButton: React.FC<SaveEventButtonProps> = ({ isUserSaveEvent }) => {
  const [isSave, setIsSave] = useState(isUserSaveEvent);

  const handleSaveEvent = () => {
    setIsSave((prev) => !prev);
    if (isSave) {
      toast("Unsaved this event successfully!");
    } else {
      toast.success("Saved this event for view later!");
    }
  };

  return (
    <div className="p-1">
      <Bookmark
        className={`${isSave ? "fill-[#136912]" : "fill-white"}`}
        size={36}
        onClick={handleSaveEvent}
      />
    </div>
  );
};

export default SaveEventButton;
