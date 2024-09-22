"use client";
import GetWithdrawal from "@/app/component/getWithdrawal";
import { useEffect, useState } from "react";

export default function CashWithdrawal() {
  const [withdraw_data, setWithdrawData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/routers/withdrawal/get_all");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        } else {
          const data = await res.json();
          setWithdrawData(data);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getData();
  }, []);
  return (
    <main className="mt-4">
      <GetWithdrawal withdraw_data={withdraw_data} />
    </main>
  );
}
