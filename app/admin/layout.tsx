"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import { SideBar } from "./components/sidebar";
import Sidebaradmin from "./components/Sidebaradmin";
import Navbar from "../component/Navbar";
import Loader from "../component/Loader";
import { useAppSelector } from "@/redux/hooks";

const inter = Inter({ subsets: ["latin"] });

// const isLoading = useAppSelector((store)=>store.LoadingReducer)

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

        <div className="p-4 ">{children}</div>
        {/* {isLoading && <Loader/>} */}
      </div>
    </div>
  );
}
