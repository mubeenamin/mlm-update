"use client";
import "../globals.css";
import { Inter } from "next/font/google";

import SidebarUser from "./userComponents/SideberUser";


import Navbar from "../component/Navbar";
import Usernavbar from "../component/userNavbar";

const inter = Inter({ subsets: ["latin"] });

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex ">
      <SidebarUser />
      <div className="w-full h-full">
     
        <Usernavbar/>
        <div className=" p-4 ">{children}</div>
      </div>
    </div>
  );
}
