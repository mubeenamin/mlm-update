import React from "react";
import UserView from "@/app/component/userView";
import ProtectedRoute from "@/app/component/protectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <UserView />;
    </ProtectedRoute>
  );
}
