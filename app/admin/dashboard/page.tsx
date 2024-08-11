"use client";

import React from "react";
import UserView from "@/app/component/userView";
import ProtectedRoute from "@/app/component/protectedRoute";

function Dashboard() {
  return (
    <ProtectedRoute>
      <UserView />
    </ProtectedRoute>
  );
}

export default Dashboard;
