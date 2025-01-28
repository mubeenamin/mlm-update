"use client";
import GetUserFund from "@/app/component/getUserFund";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter(); // Initialize the router

  const handleNavigate = () => {
    router.push("/user/newFundTransfer"); // Navigate to the /newFundTransfer page
  };
  return (
    <main>
      <div className="flex justify-end mb-4">
        <Button
          onClick={handleNavigate}
          className="bg-mlmSky hover:bg-mlmSkyLight text-white"
        >
          New Fund Transfer
        </Button>
      </div>
      <GetUserFund />
    </main>
  );
}
