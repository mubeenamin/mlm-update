
import "../globals.css";
import { Inter } from "next/font/google";
import { SideBar } from "./components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SideBar>
      {children}
      </SideBar>
    </div>
  );
}
