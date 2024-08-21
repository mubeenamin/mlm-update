"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

const UserNavbar = () => {
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
        OPUS GLOBAL <span className="text-pink">User-Panel</span>
      </h2>
      <Button variant="outline" onClick={() => userLogout()}>
        Sign Out
      </Button>
    </div>
  );
};

export default UserNavbar;
