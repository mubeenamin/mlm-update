"use client";
import User from "@/app/component/user";
import React from "react";
import { SideBar } from "../components/sidebar";
import CreateSingleUser from "@/app/component/createSingleUser";
import UserView from "@/app/component/userView";

function Dashboard() {
  return (
    <div className="h-[calc(100vh-96px] rounded-lg p-4 bg-white">
     <UserView/>
    </div>
  );
}

export default Dashboard;
