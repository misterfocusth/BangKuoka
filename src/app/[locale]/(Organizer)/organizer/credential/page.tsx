"use client";

import { useRouter } from "@/navigation";
import { Button } from "antd";
import Password from "antd/es/input/Password";
import { KeyRoundIcon } from "lucide-react";
import { FC, useState } from "react";

const CredentialPage = () => {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [cfNewPassword, setCfNewPassword] = useState("");

  const handleChangePassword = () => {};

  return (
    <div>
      <div className="flex flex-row items-center gap-2 text-xl font-bold">
        <KeyRoundIcon />
        Credential Management
      </div>

      <div className="grid grid-cols-2">
        <div className="mt-8 w-[90%]">
          <p className="m-0 ml-1 mb-3 font-semibold">{"Password"}</p>
          <Password
            className="h-12"
            size="large"
            value={newPassword}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
          />
        </div>

        <div className="mt-8 w-[90%]">
          <p className="m-0 ml-1 mb-3 font-semibold">{"Confirm Password"}</p>
          <Password
            className="h-12"
            size="large"
            value={cfNewPassword}
            onChange={(e) => setCfNewPassword(e.currentTarget.value)}
          />
        </div>

        <div className="mt-8 w-[90%]">
          <p className="m-0 ml-1 mb-3 font-semibold">{"Current Password"}</p>
          <Password
            className="h-12"
            size="large"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.currentTarget.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 mt-8 gap-8">
        <div className="w-full mx-auto flex items-center justify-center">
          <Button
            type="default"
            size="large"
            className="w-full "
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
        </div>

        <div className="w-full mx-auto flex items-center justify-center ">
          <Button type="primary" size="large" className="w-full " onClick={handleChangePassword}>
            Change Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CredentialPage;
