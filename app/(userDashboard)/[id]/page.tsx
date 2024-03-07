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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-10">
        <div>
          Username:<div>{users.nation_id}</div>
        </div>
        <div>
          Email:<div>{users.email}</div>
        </div>
        <div>
          Package:<div>{users.package}</div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-8 shadow-md grid grid-cols-3 items-center">
          <div className="col-span-2 text-lg">Daily Profit from Package</div>
          <div className="col-span-1 text-end text-4xl">$0</div>
        </Card>
        <Card className="p-8 shadow-md grid grid-cols-3 items-center">
          <div className="col-span-2 text-lg">Referrral Profit</div>
          <div className="col-span-1 text-end text-4xl">$0</div>
        </Card>
        <Card className="p-8 shadow-md grid grid-cols-3 items-center">
          <div className="col-span-2 text-lg">Total Earnings</div>
          <div className="col-span-1 text-end text-4xl">$0</div>
        </Card>
        <Card className="p-8 shadow-md grid grid-cols-3 items-center">
          <div className="col-span-2 text-lg">Total Referral Count</div>
          <div className="col-span-1 text-end text-4xl">$0</div>
        </Card>
        <Card className="p-8 shadow-md grid grid-cols-3 items-center text-lg">Total Earning</Card>
        <Card className="p-8 shadow-md grid grid-cols-3 items-center text-lg">Total Profit</Card>
      </div>
      <div className="">
        <Chart />
      </div>
    </div>
  );
}

export default Page;
