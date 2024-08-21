import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { data: session } = useSession();

  const userLogout = async () => {
    if (session) {
      await signOut();
    }
  };

  return (
    <div className="py-3 px-8 bg-white flex justify-between items-center">
      <h2 className="text-2xl font-semibold">
        {" "}
        OPUS GLOBAL <span className="text-pink">Admin-Panel</span>
      </h2>
      <Button variant="outline" onClick={() => userLogout()}>
        Sign Out
      </Button>
    </div>
  );
};

export default Navbar;
