// Antd
import { Button, ConfigProvider, Dropdown, MenuProps } from "antd";

// Lucide Icon
import { Languages } from "lucide-react";

// React
import React, { useEffect, useState } from "react";

// Next
import { usePathname, useRouter } from "../navigation";

const items: MenuProps["items"] = [
  {
    key: "en",
    label: "🇺🇸 English",
  },
  {
    key: "ja",
    label: "🇯🇵 Japanese",
  },
  {
    key: "th",
    label: "🇹🇭 Thai",
  },
];

const LanguageSwitcher = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const [selectedLang, setSelectedLang] = useState<"en" | "ja" | "th">("en");

  useEffect(() => {
    const currentLang = window.location.pathname.split("/")[1];
    if (currentLang === "en") {
      setSelectedLang("en");
    } else if (currentLang === "ja") {
      setSelectedLang("ja");
    } else if (currentLang === "th") {
      setSelectedLang("th");
    }
  }, [currentPath]);

  const handleChangeLanguage: MenuProps["onClick"] = ({ key }) => {
    router.replace(currentPath, { locale: key });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#084209",
          colorInfo: "#fff",
          borderRadius: 12,
          colorPrimaryBg: "#a0a89e",
        },
      }}
    >
      <Dropdown
        menu={{
          items,
          selectable: true,
          defaultSelectedKeys: [selectedLang],
          selectedKeys: [selectedLang],
          onClick: handleChangeLanguage,
        }}
      >
        <Button shape="circle" icon={<Languages />} size="large" onClick={() => {}} />
      </Dropdown>
    </ConfigProvider>
  );
};

export default LanguageSwitcher;
