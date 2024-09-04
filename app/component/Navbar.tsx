import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { IoIosNotifications } from "react-icons/io";
import Link from "next/link";

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

      <div className="flex gap-x-8">
        <div>
          <Link href="/user/UserNotification">
            <IoIosNotifications className="text-2xl mt-2 text-mlmSkyLight" />
          </Link>
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

export default Navbar;
