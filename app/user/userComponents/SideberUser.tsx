"use client";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { GrTransaction } from "react-icons/gr";
import { IoAnalytics, IoMedicalSharp, IoSettings } from "react-icons/io5";
import { RiShoppingCartLine } from "react-icons/ri";
import { TbMapPinCode, TbPasswordUser } from "react-icons/tb";
import { GrNotification } from "react-icons/gr";
import { TiMessages } from "react-icons/ti";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { title: "Dashboard", link: `/user/dashboard`, icon: <MdDashboard /> },
  {
    title: "Create Referral Account",
    link: "/user/createReferral",
    icon: <RiShoppingCartLine />,
  },

  { title: "Fund Transfer", link: "#", icon: <MdManageAccounts /> },
  { title: "Account History", link: "#", icon: <IoAnalytics /> },
  { title: "Referral Account", link: "#", icon: <MdManageAccounts /> },
  {
    title: "Update Package",
    link: "/admin/passwordChange",
    icon: <TbPasswordUser />,
  },
  {
    title: "MESSAGE",
    link: "/user/UserMessages",
    icon: <TiMessages />,
  },
  {
    title: "PIN CHANGE",
    link: "/admin/pinChange",
    icon: <TbMapPinCode />,
  },
  {
    title: "CASH WITHDRAWAL",
    link: "/admin/cashWithdrawal",
    icon: <IoMedicalSharp />,
  },

  {
    title: "NOTIFICATION",
    link: "/user/UserNotification",
    icon: <GrNotification />,
  },
  {
    title: "Terms & Conditions",
    link: "#",
    icon: <IoMedicalSharp />,
  },
];

const SidebarUser = () => {
  const pathname = usePathname();
  return (
    <div className="bg-white w-[300px] h-screen p-4 shrink-0">
      <div className="flex items-center gap-4">
        <Image
          src="/logo.jpeg"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        ></Image>
        <h2 className="text-2xl font-semibold">OPUS GLOBAL</h2>
      </div>
      <ul className="mt-6 space-y-4">
        {menu.map((item) => (
          <Link
            key={item.title}
            href={item.link}
            className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer hover:bg-red-800 hover:text-white
            ${pathname === item.link ? "bg-red-800 text-white" : "bg-gary-200"}`}
          >
            <div>{item.icon}</div>
            <div>{item.title}</div>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SidebarUser;
