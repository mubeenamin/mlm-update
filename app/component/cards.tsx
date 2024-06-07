"use client";
import { Card } from "@tremor/react";
import React from "react";
import Chart from "./chart";
 
function CardsUser({ users }: any) {
  let userBalance: number = Number(users.balance);
  let userReferral: any = Number(userBalance*0.1).toFixed(2);
  
  const totalEarnings: number = userBalance + Number(userReferral);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-8 shadow-md grid items-center gap-8 bg-orange-400 rounded-md">
          <div className="col-span-2 text-lg">Daily Profit From Package</div>
          <div className="col-span-1 text-4xl">${users.balance}</div>
        </Card>
        <Card className="p-8 shadow-md grid items-center gap-8 bg-green-400 rounded-md">
          <div className="col-span-2 text-lg">Referrral Profit</div>
          <div className="col-span-1  text-4xl">${userReferral}</div>
        </Card>
        <Card className="p-8 shadow-md grid  items-center gap-8 bg-blue-400 rounded-md">
          <div className="col-span-2 text-lg">Total Earnings</div>
          <div className="col-span-1  text-4xl">
            ${totalEarnings}
          </div>
        </Card>
        <Card className="p-8 shadow-md grid  items-center gap-8 rounded-md">
          <div className="col-span-2 text-lg">Total Referral Count</div>
          <div className="col-span-1 text-4xl">$0</div>
        </Card>
        <Card className="p-8 shadow-md grid  items-center text-lg rounded-md">
          <div className="col-span-2 text-lg">Total Earning</div>
          <div className="col-span-1 text-4xl">$0</div>
        </Card>
        <Card className="p-8 shadow-md grid  items-center text-lg rounded-md">
          <div className="col-span-2 text-lg">Total Profit</div>
          <div className="col-span-1 text-4xl">$0</div>
        </Card>
      </div>
     
    </div>
  );
}

export default CardsUser;
