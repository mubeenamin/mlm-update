import React from "react";
import UserView from "@/app/component/userView";
import ProtectedRoute from "@/app/component/protectedRoute";

export default function Dashboard() {
  return (

    <ProtectedRoute>
      <div className="h-[calc(100vh-96px] rounded-lg p-4 bg-white">
     <UserView/>
    </div>
    </ProtectedRoute>
    
  );
}

