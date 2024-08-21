import "../globals.css";
import { Inter } from "next/font/google";

import SidebarUser from "./userComponents/SideberUser";

import UserNavbar from "./userComponents/UserNavbar";
import Navbar from "../component/Navbar";

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
        <Navbar />
        <div className="bg-white p-4 h-(calc(100vh-64px)">{children}</div>
      </div>
    </div>
  );
}
