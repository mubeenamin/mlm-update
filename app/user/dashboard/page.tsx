"use client";

import CardsUser, { User } from "@/app/component/cards";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function Page() {
  const { data: session, status } = useSession();
  // @ts-ignore
  const userdata: number = session?.user?.id;

  const [users, setUsers] = useState({
    id: 0,
    nation_id: "string",
    email: "string",
    password: "string",
    phone: "string",
    currency: "string",
    country: "string",
    city: "string",
    package: "string",
    role: "string",
    created_at: "string",
    Balances: {
      balance: "string",
      user_id: 0,
      id: 0,
    },
    Withdrawals: [
      {
        withdrawal_amount: "string",
        status: "string",
        user_id: 0,
        id: 0,
      },
    ],
    Pin: {
      pin: "string",
      user_id: 0,
      id: 0,
    },
    referrals: [],
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/fastapi/api/routers/user/single_user/${userdata}`,
          {
            mode: "no-cors",
          }
        );

        if (!res.ok) {
          // res.ok returns false if the HTTP status is not 200-299
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setUsers(data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <main>
      <CardsUser users={users} />
    </main>
  );
}

export default Page;
