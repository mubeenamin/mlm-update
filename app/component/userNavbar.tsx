import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { SheetDemo } from "./notificationuser";
import { UserResNav } from "../user/userComponents/userResNav";
import Image from "next/image";

const Usernavbar = () => {
    const { data: session } = useSession();

    const userLogout = async () => {
        if (session) {
            await signOut();
        }
    };

    return (
        <div className="py-3 px-4 md:px-8 bg-white flex justify-between items-center">
           <div className="flex  ">
           <div className="md:hidden">
                <UserResNav/>
            </div>
            <div>
            <h2 className="flex items-center gap-2 text-sm md:text-2xl text-mlmSky font-semibold">
          <Image src="/logo.jpeg" alt="logo" width={32} height={32} className="rounded-full size-32 md:hidden"/>
         <span className="hidden md:block">OPUS GLOBAL</span>  <span className="text-mlmSkyLight ">User Dashboard</span>
        </h2>
            </div>
           </div>

            <div className="flex gap-x-4 md:gap-x-8">
                <div>

                    <SheetDemo />
                </div>

                <Button
                    className=" bg-mlmSkyLight hover:bg-mlmSky"
                    variant="outline"
                    onClick={() => userLogout()}
                >
                    Sign Out
                </Button>
            </div>
        </div>
    );
};

export default Usernavbar;
