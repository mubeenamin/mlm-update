import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { IoIosNotifications } from "react-icons/io";
import Link from "next/link";
import { Sheet } from "@/components/ui/sheet";
import { SheetDemo } from "./notificationuser";
import { ResponsiveNav } from "./responsiveNav";

const Navbar = () => {
  const { data: session } = useSession();

  const userLogout = async () => {
    if (session) {
      await signOut();
    }
  };

  return (
    <div className="py-3 px-2 md:px-8x bg-white flex justify-between items-center">
      <div className="flex  items-center ">
        <div className="md:hidden">
        <ResponsiveNav/>
        </div>
        <div>
        <h2 className="flex items-center gap-2 text-sm md:text-2xl text-mlmSky font-semibold">
          <Image src="/logo.jpeg" alt="logo" width={32} height={32} className="rounded-full size-32 md:hidden"/>
         <span className="hidden md:block">OPUS GLOBALS</span>  <span className="text-mlmSkyLight">Admin Dashboard</span>
        </h2>
        </div>
      </div>

      
       

        <Button
          className=" bg-mlmSkyLight hover:bg-mlmSky w-[80px] text-sm md:text-auto md:w-auto"
          variant="outline"
          onClick={() => userLogout()}
        >
          Sign Out
        </Button>
        
    </div>
  );
};

export default Navbar;
