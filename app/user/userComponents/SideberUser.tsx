"use client";
import { MdDashboard, MdManageAccounts } from "react-icons/md";
import { IoAnalytics, IoMedicalSharp } from "react-icons/io5";
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

  {
    title: "Fund Transfer",
    link: "/user/fundTransfer",
    icon: <MdManageAccounts />,
  },
  {
    title: "Account History",
    link: "/user/accountHistory",
    icon: <IoAnalytics />,
  },
  { title: "Referral Account", link: "#", icon: <MdManageAccounts /> },
  {
    title: "Change Password",
    link: "/user/ChangePassword",
    icon: <TbPasswordUser />,
  },
  {
    title: "Messages",
    link: "/user/messages",
    icon: <TiMessages />,
  },

  {
    title: "Cash Withdrawal",
    link: "/user/withdrawal",
    icon: <IoMedicalSharp />,
  },

  // {
  //   title: "Notification",
  //   link: "/user/UserNotification",
  //   icon: <GrNotification />,
  // },
  {
    title: "Terms & Conditions",
    link: "/user/TermsAndConditions",
    icon: <IoMedicalSharp />,
  },
];

const SidebarUser = () => {
  const pathname = usePathname();
  return (
    <div className="bg-white w-[80px] md:w-[300px] h-screen p-4 shrink-0 hidden md:block">
      <div className="flex items-center gap-4">
        <Image
          src="/logo.jpeg"
          alt="logo"
          width={50}
          height={50}
          className="rounded-full"
        ></Image>
        <h2 className="text-2xl font-semibold">OPUS GLOBALS</h2>
      </div>
      <ul className="mt-6 space-y-4 ">
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
  );
};

export default SidebarUser;
