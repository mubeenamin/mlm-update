"use client";
import UserView from "@/app/component/userView";
import axios from "axios";
import { useEffect, useState } from "react";
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  Balances: {
    balance: string;
    package: string;
  };
  country: string;
  city: string;
  referrals: Array<{ referred_user_id: number }>;
}

export default function AllAccountHistory() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/routers/user/me");
        if (!res) {
          throw new Error(`HTTP error! status: ${res}`);
        } else {
          console.log(res.data);
          setdata(res.data);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div>
      <UserView data={data} />
    </div>
  );
}
