"use client";

import Chart from "@/app/component/chart";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";

type Prop = {
  id: number;
};

function Page({ params }: { params: { id: Prop } }) {
  const userdata = params.id;
  const userID = Number(userdata);
  const [users, setUsers] = useState({
    nation_id: "",
    email: "",
    password: "",
    phone: "",
    currency: "",
    country: "",
    city: "",
    package: "",
    role: "",
    created_at: "",
    referral_id: null,
    id: null,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      console.log(userID);
      try {
        const res = await fetch(`/api/single_users/${userID}`, {
          mode: "no-cors",
        });
        if (!res.ok) {
          // res.ok returns false if the HTTP status is not 200-299
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUsers(data);
        console.log(data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-4">
      <div>Username:{users.nation_id}</div>
      <div>Email:{users.email}</div>
      <div>Package:{users.package}</div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-8 shadow-md">
          <div>Daily Profit from Package</div>
          <div>{users.package}</div>
        </Card>
        <Card className="p-8 shadow-md">
          <div>Referrral Profit</div>
          <div>{users.package}</div>
        </Card>
        <Card className="p-8 shadow-md">
          <div>Total Earnings</div>
          <div>{users.package}</div>
        </Card>
        <Card className="p-8 shadow-md">
          <div>Total Referral Count</div>
          <div>0</div>
        </Card>
        <Card className="p-8 shadow-md">Total Earning</Card>
        <Card className="p-8 shadow-md">Total Profit</Card>
        
      </div>
      <div className=""><Chart/></div>
    </div>
  );
}

export default Page;
