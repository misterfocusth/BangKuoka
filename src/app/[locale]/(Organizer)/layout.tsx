"use client";

import { Breadcrumb, ConfigProvider, Layout, Menu, MenuProps, theme } from "antd";
import {
  CalendarOutlined,
  EditFilled,
  HomeOutlined,
  KeyOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { useContext, useEffect, useState, useTransition } from "react";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { Info } from "lucide-react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import OrganizerProfileDropdown from "@/components/OrganizerProfileDropdown";
import { AuthContext } from "@/contexts/AuthContext";
import { Organizer } from "@/app/types/organizer";

const { Header, Content, Sider } = Layout;

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const currentUser = useContext(AuthContext).currentUser as Organizer;
  const router = useRouter();

  const [siderWidth, setSiderWidth] = useState(0);

  useEffect(() => {
    if (window.screen) {
      setSiderWidth(window.screen.width * 0.15);
    }
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#0068B2",
          colorInfo: "#0068B2",
          borderRadius: 12,
          colorPrimaryBg: "#1677ff00",
          fontFamily: "Noto Sans",
        },
      }}
    >
      <Layout className="min-h-full">
        <Header
          // style={{ display: "flex", alignItems: "center" }}
          className="bg-white shadow border-b flex flex-row items-center justify-between"
        >
          <div className="text-xl font-bold text-[#136912]">
            Bang<span className="text-[#0068B2]">Kuoka</span>
          </div>
          <div className="font-semibold text-xl">{currentUser?.name || ""}</div>
          <div className="flex flex-row items-center gap-4">
            <OrganizerProfileDropdown />
          </div>
          {/* <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          // defaultSelectedKeys={["2"]}
          // items={items1}
          style={{ flex: 1, minWidth: 0 }}
        /> */}
        </Header>
        <Layout>
          <Sider style={{ background: colorBgContainer, paddingLeft: "18px" }} width={siderWidth}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              style={{
                height: "100%",
                borderRight: 0,
                marginTop: "18px",
                fontSize: "16px",
              }}
              items={[
                {
                  key: "1",
                  icon: <SettingOutlined />,
                  label: "Event",
                  onClick: () => router.push("/organizer/dashboard"),
                },
                {
                  key: "2",
                  icon: <CalendarOutlined />,
                  label: "Calendar",
                  onClick: () => router.push("/organizer/calendar"),
                },
                {
                  key: "3",
                  icon: <UserOutlined />,
                  label: "Profile",
                  onClick: () => router.push("/organizer/profile"),
                },
                {
                  key: "4",
                  icon: <EditFilled />,
                  label: "Edit Profile",
                  onClick: () => router.push("/organizer/profile/edit"),
                },
                {
                  key: "5",
                  icon: <KeyOutlined />,
                  label: "Credential",
                  onClick: () => router.push("/organizer/credential"),
                },
              ]}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item> */}
            </Breadcrumb>
            <Content
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default AdminLayout;
