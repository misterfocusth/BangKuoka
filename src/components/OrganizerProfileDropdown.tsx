import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "@/navigation";
import { Button, ConfigProvider, Dropdown, MenuProps } from "antd";
import { FC, useContext } from "react";

interface OrganizerProfileDropdownProps {
  profile_image_src?: string;
}

const items: MenuProps["items"] = [
  {
    key: "logout",
    label: "Logout",
  },
];

const OrganizerProfileDropdown: FC<OrganizerProfileDropdownProps> = () => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const handleChangeLanguage: MenuProps["onClick"] = ({ key }) => {
    if (key === "logout") {
      authContext.logout("ORGANIZER");
    }
  };

  return (
    <div>
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
            onClick: handleChangeLanguage,
          }}
        >
          <Button>Organizer</Button>
        </Dropdown>
      </ConfigProvider>
    </div>
  );
};

export default OrganizerProfileDropdown;
