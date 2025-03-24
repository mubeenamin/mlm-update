"use client";

import { useEffect, useState } from "react";
import { User } from "@/lib/types";
import LoadingSpinner from "@/app/component/lodingSpinner";
import HistoryCard from "@/app/component/historyCard";
import { useSession } from "next-auth/react";
// Create a simple spinner component

const AccountHistoryAdmin = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  // @ts-ignore
  const user_id = session?.user?.id;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/routers/user/users/${user_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: User = await response.json();

        setUserData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!userData) {
    return <div className="p-4">No data found</div>;
  }

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Account History</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HistoryCard
          title="Balances"
          value={
            userData?.Balances?.balance
              ? `$${parseInt(userData.Balances.balance).toLocaleString()}`
              : "N/A"
          }
          href="/admin/dashboard"
        />

        <HistoryCard
          title="Referrals"
          value={(userData?.referrals?.length ?? 0).toString()}
          href="/admin/referrals"
        />

        <HistoryCard
          title="Fund Transfers"
          value={(userData?.fund?.length ?? 0).toString()}
          href="/admin/fundTransfer"
        />

        <HistoryCard
          title="Withdrawals"
          value={""}
          href="/admin/cashWithdrawal"
        />
      </div>
    </div>
  );
};

export default AccountHistoryAdmin;
