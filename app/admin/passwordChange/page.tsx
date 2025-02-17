import ChangePassword from "@/app/component/changePassword";
import PasswordChangeWithOTP from "@/app/component/PasswordChangeWithOTP";
import React from "react";

export default function PasswordChange() {
  return (
    <div className="bg-white h-[calc(100vh-96px] rounded-lg p-4">
      <PasswordChangeWithOTP />
    </div>
  );
}
