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
import { Sheet } from "@/components/ui/sheet";
import { ResponsiveNav } from "@/app/component/responsiveNav";


const menu = [
  { title: "Dashboard", link: "/admin/dashboard", icon: <MdDashboard /> },
  {
    title: "Create User Account",
    link: "/admin/createUser",
    icon: <RiShoppingCartLine />,
  },
  { title: "Daily Created Accounts", link: "#", icon: <GrTransaction /> },
  { title: "Fund Transfer", link: "/admin/fundTransfer", icon: <MdManageAccounts /> },
  { title: "Account History", link: "/admin/accountHistory", icon: <IoAnalytics /> },
  {
    title: "All ACCOUNTS HISTORY",
    link: "/admin/allAccountHistory",
    icon: <IoSettings />,
  },
  {
    title: "PASSWORD CHANGE",
    link: "/admin/passwordChange",
    icon: <TbPasswordUser />,
  },
  
  {
    title: "MESSAGE",
    link: "/admin/message",
    icon: <TiMessages />,
  },
  {
    title: "DEACTIVATE ACCOUNT",
    link: "/admin/deactivateAccount",
    icon: <TbMapPinCode />,
  },
  {
    title: "NOTIFICATION",
    link: "/admin/notification",
    icon: <GrNotification />,
  },
  {
    title: "CASH WITHDRAWAL",
    link: "/admin/cashWithdrawal",
    icon: <IoMedicalSharp />,
  },
];



const Sidebaradmin = () => {
  const pathname = usePathname();
  return (
    <main>
    <div className="hidden md:block w-[300px] h-screen p-4 shrink-0">
      <div className="flex items-center gap-4">
        <Image
          src="/logo.jpeg"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        ></Image>
        <h2 className="text-2xl font-semibold text-[#7091E6]">OPUS GLOBALS</h2>
      </div>
      <ul className="mt-6 bg-blue-200/20 space-y-4">
        {menu.map((item) => (
          <Link
            key={item.title}
            href={item.link}
            className={`flex items-center gap-2 p-4 rounded-lg cursor-pointer hover:odd:bg-mlmSky hover:even:bg-mlmSkyLight hover:text-white
            ${pathname === item.link ? "bg-mlmSky text-white" : "bg-gary-200"}`}
          >
            <div>{item.icon}</div>
            <div>{item.title}</div>
          </Link>
        ))}
      </ul>
    </div>
   
    </main>
  );
};

export default Sidebaradmin;
