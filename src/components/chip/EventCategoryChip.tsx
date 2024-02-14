import {
  Baby,
  Book,
  Bot,
  FerrisWheel,
  Film,
  HeartHandshake,
  Medal,
  MoreHorizontal,
  Music,
  Palette,
  Shirt,
  Utensils,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const CHIP_ICONS = {
  "0": <Palette />,
  "1": <Bot />,
  "2": <Music />,
  "3": <Film />,
  "4": <Book />,
  "5": <FerrisWheel />,
  "6": <Shirt />,
  "7": <Utensils />,
  "8": <HeartHandshake />,
  "9": <Medal />,
  "10": <Baby />,
  "11": <MoreHorizontal />,
};

const CHIP_TITLE = {
  "0": "event_cat_2_label",
  "1": "event_cat_0_label",
  "2": "event_cat_3_label",
  "3": "event_cat_4_label",
  "4": "event_cat_5_label",
  "5": "event_cat_12_label",
  "6": "event_cat_6_label",
  "7": "event_cat_7_label",
  "8": "event_cat_8_label",
  "9": "event_cat_9_label",
  "10": "event_cat_10_label",
  "11": "event_cat_11_label",
};

const CHIP_COLOR = {
  "0": "#FFE7AA",
  "1": "#9FCBEB",
  "2": "#EBAD9F",
  "3": "#EBC39F",
  "4": "#ACAEE7",
  "5": "#EFC1F7",
  "6": "#A4E7A7",
  "7": "#F7C4C0",
  "8": "#D1E7AD",
  "9": "#BBEBF5",
  "10": "#FDFCF7",
  "11": "#C5C3BE",
};

interface EventCategoryProps {
  categoryId: string;
}

const EventCategoryChip: React.FC<EventCategoryProps> = ({ categoryId }) => {
  const t = useTranslations("Index");

  return (
    <div
      className={`p-1 px-4 flex items-center gap-1 rounded-xl w-fit`}
      style={{
        backgroundColor: CHIP_COLOR[categoryId as keyof typeof CHIP_COLOR],
      }}
    >
      {CHIP_ICONS[categoryId as keyof typeof CHIP_ICONS]}
      <div className="text-sm">{t(CHIP_TITLE[categoryId as keyof typeof CHIP_TITLE])}</div>
    </div>
  );
};

export default EventCategoryChip;
