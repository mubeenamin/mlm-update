import "../globals.css";
import { Inter } from "next/font/google";
import { SideBar } from "./components/sidebar";
import Sidebaradmin from "./components/Sidebaradmin";
import Navbar from "../component/Navbar";
import SessionWrapper from "../component/sessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebaradmin />
      <div className="w-full h-full">
        <Navbar />
        <div className="pt-4 px-4">{children}</div>
      </div>
    </div>
  );
}
