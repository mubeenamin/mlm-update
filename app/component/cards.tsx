"use client";
import { Card } from "@tremor/react";
import React from "react";
export type User = {
  id: number;
  nation_id: string;
  email: string;
  password: string;
  phone: string;
  currency: string;
  country: string;
  city: string;
  package: string;
  role: string;
  created_at: string;
  Balances: {
    balance: string;
    user_id: number;
    id: number;
  };
  Withdrawals: [
    {
      withdrawal_amount: string;
      status: string;
      user_id: number;
      id: number;
    },
  ];
  Pin: {
    pin: string;
    user_id: number;
    id: number;
  };
  referrals: [
    {
      referral_id: number;
      referrer_user_id: number;
      referred_user_id: number;
      referral_type_id: number;
    },
  ];
};
function CardsUser({ users }: any) {
  console.log(users);

  let userBalance: number = Number(users.Balances.balance);
  const directReferrals = users.referrals.filter(
    (referrals: any) => referrals.referral_type_id === 1
  );
  const indirectReferrals = users.referrals.filter(
    (referrals: any) => referrals.referral_type_id === 2
  );
  let percentProfit = 0;
  if (directReferrals.length >= 1 && directReferrals.length <= 24) {
    percentProfit = 0.1;
  } else if (directReferrals.length >= 25 && directReferrals.length <= 119) {
    percentProfit = 0.2;
  } else if (directReferrals.length >= 120 && directReferrals.length <= 299) {
    percentProfit = 0.3;
  } else if (directReferrals.length >= 300 && directReferrals.length <= 699) {
    percentProfit = 0.4;
  } else if (directReferrals.length >= 700) {
    percentProfit = 0.5;
  }

  const directReferralsProfit = Number(
    userBalance * directReferrals.length * percentProfit
  );
  const indirectReferralsProfit = Number(
    userBalance * indirectReferrals.length * 0.03
  );

  const totalReferralProfit: number = Number(
    directReferralsProfit + indirectReferralsProfit
  );

  const totalEarninggs: number = Number(userBalance + totalReferralProfit);

  return users ? (
    <main>
      <div className="space-y-4 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-10 prose-h3:text-xl ">
          <h3>
            Username:<div>{users.nation_id}</div>
          </h3>
          <h3>
            Email:<div>{users.email}</div>
          </h3>
          <h3>
            Package:<div>{users.package}</div>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-8 shadow-md grid items-center gap-8 bg-orange-400 rounded-md">
            <div className="col-span-2 text-lg">Daily Profit From Package</div>
            <div className="col-span-1 text-4xl">${}</div>
          </Card>
          <Card className="p-8 shadow-md grid items-center gap-8 bg-green-400 rounded-md">
            <div className="col-span-2 text-lg">Referrral Profit</div>
            <div className="col-span-1  text-4xl">${totalReferralProfit}</div>
          </Card>
          <Card className="p-8 shadow-md grid  items-center gap-8 bg-blue-400 rounded-md">
            <div className="col-span-2 text-lg">Total Earnings</div>
            <div className="col-span-1  text-4xl">${totalEarninggs}</div>
          </Card>
          <Card className="p-8 shadow-md grid  items-center text-lg gap-8 rounded-md">
            <div className="col-span-2 text-lg">Total Referral Count</div>
            <div className="col-span-1 text-4xl">{users.referrals.length}</div>
          </Card>
          {/* <Card className="p-8 shadow-md grid  items-center text-lg gap-8 rounded-md">
            <div className="col-span-2 text-lg">Total Profit</div>
            <div className="col-span-1 text-4xl">$0</div>
          </Card> */}
        </div>
      </div>
    </main>
  ) : (
    <div className="text-center text-2xl">No User Found</div>
  );
}

export default CardsUser;
