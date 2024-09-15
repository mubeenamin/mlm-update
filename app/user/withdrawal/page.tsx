"use client";
import GetUserWithdrawal from "@/app/component/getUserWithdrawal";
import NewWithdrawal from "@/app/component/newWithdrawal";
import { useSession } from "next-auth/react";
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
  }, []);
  return (
    <div>
      <div className="flex justify-end mb-4">
        <NewWithdrawal />
      </div>
      <GetUserWithdrawal withdraw_data={withdraw_data} />
    </div>
  );
}

export default Page;
