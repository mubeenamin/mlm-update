"use client";
import { Card } from "@tremor/react";
import React from "react";
import Chart from "./chart";

function CardsUser({ users }: any) {
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
        <Card className="p-8 shadow-md grid items-center gap-8 bg-orange-400">
          <div className="col-span-2 text-lg">Daily Profit From Package</div>
          <div className="col-span-1 text-4xl">${users.balance}</div>
        </Card>
        <Card className="p-8 shadow-md grid items-center gap-8 bg-green-400">
          <div className="col-span-2 text-lg">Referrral Profit</div>
          <div className="col-span-1  text-4xl">${users.referral_profit}</div>
        </Card>
        <Card className="p-8 shadow-md grid  items-center gap-8 bg-blue-400">
          <div className="col-span-2 text-lg">Total Earnings</div>
          <div className="col-span-1  text-4xl">
            ${users.balance}+${users.referral_profit}
          </div>
        </Card>
        <Card className="p-8 shadow-md grid  items-center gap-8">
          <div className="col-span-2 text-lg">Total Referral Count</div>
          <div className="col-span-1 text-4xl">$0</div>
        </Card>
        <Card className="p-8 shadow-md grid  items-center text-lg">
          <div className="col-span-2 text-lg">Total Earning</div>
          <div className="col-span-1 text-4xl">$0</div>
        </Card>
        <Card className="p-8 shadow-md grid  items-center text-lg">
          <div className="col-span-2 text-lg">Total Profit</div>
          <div className="col-span-1 text-4xl">$0</div>
        </Card>
      </div>
      <div className="">
        <Chart />
      </div>
    </div>
  );
}

export default CardsUser;
