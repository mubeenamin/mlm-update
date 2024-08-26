import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Navbar = ({name} : { name: string }) => {
  const { data: session } = useSession();

  const userLogout = async () => {
    if (session) {
      await signOut();
    }
  };

  return (
    <div className="py-3 px-8 bg-white flex justify-between items-center">
      <h2 className="text-2xl text-lamaYellow font-semibold">
        
        OPUS GLOBAL <span className="text-lamaPurple">{name}</span>
      </h2>
      <Button className="bg-lamaYellow hover:bg-lamaPurple" variant="outline"  onClick={() => userLogout()}>
        Sign Out
      </Button>
    </div>
  );
};

export default Navbar;
