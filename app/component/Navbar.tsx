import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { IoIosNotifications } from "react-icons/io";
import Link from "next/link";
import { Sheet } from "@/components/ui/sheet";
import { SheetDemo } from "./notificationuser";

const Navbar = ({ name }: { name: string }) => {
  const { data: session } = useSession();

  const userLogout = async () => {
    if (session) {
      await signOut();
    }
  };

  return (
    <div className="py-3 px-8 bg-white flex justify-between items-center">
      <div>
        <h2 className="text-2xl text-mlmSky font-semibold">
          OPUS GLOBAL <span className="text-mlmSkyLight">{name}</span>
        </h2>
      </div>

      
       

        <Button
          className=" bg-mlmSkyLight hover:bg-mlmSky"
          variant="outline"
          onClick={() => userLogout()}
        >
          Sign Out
        </Button>
     
    </div>
  );
};

export default Navbar;
