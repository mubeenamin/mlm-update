"use client";
import UserReferrals from "@/app/component/userReferrals";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  Balances: {
    balance: string;
    package: string;
  };
  fund: Array<{
    amount: string;
  }>;
};

export default function Page() {
  const { data: session } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get user ID from session
  // @ts-ignore
  const user_id = session?.user?.id;

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!user_id) {
          throw new Error("User not authenticated");
        }

        const response = await fetch(`/api/routers/user/users/${user_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch user data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (user_id) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user_id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 bg-red-100 rounded-lg">
        Error: {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-4 text-gray-500">
        {user_id ? "No user data found" : "Please sign in to view your profile"}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Referrals</h1>
      <UserReferrals data={[user]} />
    </div>
  );
}
