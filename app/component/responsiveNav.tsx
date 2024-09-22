"use client";

import { TiThMenu } from "react-icons/ti";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

import { useState } from "react";
import Image from "next/image";

const menu = [
  { title: "Dashboard", link: "/admin/dashboard" },
  { title: "Create User Account", link: "/admin/createUser" },
  { title: "Daily Created Accounts", link: "#" },
  { title: "Fund Transfer", link: "#" },
  { title: "Account History", link: "#" },
  { title: "All ACCOUNTS HISTORY", link: "/admin/allAccountHistory" },
  { title: "PASSWORD CHANGE", link: "/admin/passwordChange" },
  { title: "PIN CHANGE", link: "/admin/pinChange" },
  { title: "MESSAGE", link: "/admin/message" },
  { title: "DEACTIVATE ACCOUNT", link: "/admin/deactivateAccount" },
  { title: "NOTIFICATION", link: "/admin/notification" },
  { title: "CASH WITHDRAWAL", link: "/admin/cashWithdrawal" },
];

export function ResponsiveNav() {
  
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          <TiThMenu size={24} className="text-mlmSky" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <div className="max-h-screen overflow-y-auto">
        <div className="flex items-center gap-4">
        <Image
          src="/logo.jpeg"
          alt="logo"
          width={40}
          height={40}
          className="rounded-full"
        ></Image>
        <h2 className="text-xl font-semibold text-[#7091E6]">OPUS GLOBAL</h2>
      </div>
          <ul className="mt-4 mb-4 bg-blue-200/20 ">
            {menu.map((item) => (
              <Link
                key={item.title}
                href={item.link}
                className="flex items-center gap-2 p-4 rounded-lg cursor-pointer hover:odd:bg-mlmSky hover:even:bg-mlmSkyLight hover:text-white"
                onClick={handleLinkClick}
              >
                <div>{item.title}</div>
              </Link>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
