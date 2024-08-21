import "../globals.css";
import { Inter } from "next/font/google";
import { UserSideBar } from "./userComponents/userSidebar";
import SidebarUser from "./userComponents/SideberUser";

import UserNavbar from "./userComponents/UserNavbar";
import SessionWrapper from "../component/sessionWrapper";

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
        <UserNavbar />
        <div className="p-4 ">{children}</div>
      </div>
    </div>
  );
}
