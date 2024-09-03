"use client";
import { Card } from "@tremor/react";
import axios from "axios";
import React, { useEffect } from "react";

function CardsUser({ users }: any) {
  let userBalance: number;
  let dailyProfitPkg;
  let directReferrals;
  let indirectReferrals;
  let percentProfit;
  let directReferralsProfit;
  let indirectReferralsProfit;
  let totalReferralProfit: number;
  let totalEarninggs: number;
  let starCount: number;
  let userPackage: string;
  if (users === null) {
    return <div className="text-3xl">loading...</div>;
  } else {
    userBalance = Math.round(users.Balances.balance);
    userPackage = users.Balances.package;
    dailyProfitPkg = 0;
    if (userPackage === "Bronze") {
      dailyProfitPkg = 1;
    } else if (userPackage === "Silver") {
      dailyProfitPkg = 2;
    } else if (userPackage === "Gold") {
      dailyProfitPkg = 4;
    } else if (userPackage === "Gold Plus") {
      dailyProfitPkg = 8;
    } else if (userPackage === "Daimond") {
      dailyProfitPkg = 16;
    } else if (userPackage === "Daimond Plus") {
      dailyProfitPkg = 32;
    } else if (userPackage === "Platinum") {
      dailyProfitPkg = 64;
    } else if (userPackage === "Platinum Plus") {
      dailyProfitPkg = 128;
    }
    directReferrals = users.referrals.filter(
      (referrals: any) => referrals.referral_type_id === 1
    );
    indirectReferrals = users.referrals.filter(
      (referrals: any) => referrals.referral_type_id === 2
    );
    percentProfit = 0;
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

    directReferralsProfit = Number(
      userBalance * directReferrals.length * percentProfit
    );
    indirectReferralsProfit = Number(
      userBalance * indirectReferrals.length * 0.03
    );

    if (!users) {
      totalReferralProfit = 0;
      totalEarninggs = 0;
    } else {
      totalReferralProfit = Math.round(
        directReferralsProfit + indirectReferralsProfit
      );
      totalEarninggs = Math.round(dailyProfitPkg + totalReferralProfit);
    }
    starCount = Math.round(percentProfit * 5);
  }
  return (
    <main>
      {users === null ? (
        <div className="text-center text-4xl">loading...</div>
      ) : (
        <div className="space-y-4 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 pb-10 prose-h3:text-xl text-center ">
          
            <h3 >
              Username:<div>{users.nation_id}</div>
            </h3>
            
            <h3>
              Email:<div>{users.email}</div>
            </h3>
            <h3>
              Package:<div>{users.Balances.package}</div>
            </h3>
            <div className="flex flex-col">
              <h3>Rating:</h3>
              <div>
                {Array.from({ length: 5 }, (_, index) => (
                  <span
                    key={index}
                    className={`text-4xl ${index < starCount ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-8 shadow-md grid items-center gap-8 bg-mlmSky rounded-md">
              <div className="col-span-2 text-lg">
                Daily Profit From Package
              </div>
              <div className="col-span-2 text-4xl text-end">
                ${dailyProfitPkg}
              </div>
            </Card>
            <Card className="p-8 shadow-md grid items-center gap-8 bg-mlmSkyLight rounded-md">
              <div className="col-span-2 text-lg">Referral Profit</div>
              <div className="col-span-2  text-4xl text-end">
                ${totalReferralProfit}
              </div>
            </Card>
            <Card className="p-8 shadow-md grid  items-center gap-8 bg-mlmSky rounded-md">
              <div className="col-span-2 text-lg">Total Earnings</div>
              <div className="col-span-2  text-4xl text-end">
                ${totalEarninggs}
              </div>
            </Card>
            <Card className="p-8 shadow-md grid  items-center bg-mlmSkyLight text-lg gap-8 rounded-md">
              <div className="col-span-2 text-lg">Direct Referral Count</div>
              <div className="col-span-2 text-4xl text-end">
                {directReferrals.length}
              </div>
            </Card>
            <Card className="p-8 shadow-md grid  items-center bg-mlmSky text-lg gap-8 rounded-md">
              <div className="col-span-2 text-lg">Indirect Referral Count</div>
              <div className="col-span-2 text-4xl text-end">
                {indirectReferrals.length}
              </div>
            </Card>
            <Card className="p-8 shadow-md grid  items-center  bg-mlmSkyLight text-lg gap-8 rounded-md">
              <div className="col-span-2 text-lg">Total Profit</div>
              <div className="col-span-2 text-4xl text-end">${userBalance}</div>
            </Card>
          </div>
        </div>
      )}
    </main>
  );
}

export default CardsUser;
