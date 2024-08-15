import NotificationView from "@/app/component/notificationView";
import ProtectedRoute from "@/app/component/protectedRoute";
import React from "react";

export default function Message() {
  return <div>
    <ProtectedRoute>
    <NotificationView/>
    </ProtectedRoute>
  </div>;
}
