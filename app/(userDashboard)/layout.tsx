
import "../globals.css";
import { Inter } from "next/font/google";
import { UserSideBar } from "./userComponents/userSidebar";


const inter = Inter({ subsets: ["latin"] });

export default function UserDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <UserSideBar>
      {children}
      </UserSideBar>
    </div>
  );
}
