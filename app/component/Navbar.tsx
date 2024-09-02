import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Navbar = ({ name }: { name: string }) => {
  const { data: session } = useSession();

  const userLogout = async () => {
    if (session) {
      await signOut();
    }
  };

  return (
    <div className="py-3 px-8 bg-white flex justify-end">
      <Button className="" variant={"outline"} onClick={() => userLogout()}>
        <LogOut className="pr-1" /> Sign Out
      </Button>
    </div>
  );
};

export default Navbar;
