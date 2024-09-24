"use client";
import "../globals.css";
import { Inter } from "next/font/google";
import Sidebaradmin from "./components/Sidebaradmin";
import Navbar from "../component/Navbar";

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

        <div className="p-4 ">{children}</div>
      </div>
    </div>
  );
}
