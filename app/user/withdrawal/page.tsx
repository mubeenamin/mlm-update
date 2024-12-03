"use client";
import GetUserWithdrawal from "@/app/component/getUserWithdrawal";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

function Page() {
  const { data: session } = useSession();
  // @ts-ignore
  const user_id = session?.user?.id;
  const [withdraw_data, setWithdrawData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `/api/routers/withdrawal/get_withdrawal_by_user_id/${user_id}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setWithdrawData(data);
    };
    fetchData();
  }, [user_id]);
  return (
    <div>
      <div className="flex justify-end mb-4">
        <Link href="/user/newWithdrawal">
          <Button className="bg-mlmSky hover:bg-mlmSkyLight text-white">
            New Withdrawal
          </Button>
        </Link>
      </div>
      <GetUserWithdrawal withdraw_data={withdraw_data} />
    </div>
  );
}

export default Page;
