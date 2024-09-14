"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminCard from "@/app/component/admincard";
import CountChart from "@/app/component/CountChart";

function Page() {
  const { data: session, status } = useSession();
  // @ts-ignore
  const userdata: number = session?.user?.id;

  const [users, setUsers] = useState(null);
  const [totalBalance, setTotalBalance] = useState({ total_balance: 0 });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/routers/user/single_user/${userdata}`, {
          mode: "no-cors",
        });
        const res2 = await fetch(`/api/routers/balance/calculate_balances`, {
          mode: "no-cors",
        });

        if (!res.ok) {
          // res.ok returns false if the HTTP status is not 200-299
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const data2 = await res2.json();

        setUsers(data);
        setTotalBalance(data2);
      } catch (error) {}
    };

    fetchData();
  }, [userdata]);

  let directReferrals;
  let indirectReferrals;
  let totalReferral = 0;
  let totalFunds;
  let totalUsers;
  if (users === null) {
    return <div className="text-3xl">loading...</div>;
  } else {
    // @ts-ignore
    directReferrals = users.referrals.filter(
      (referrals: any) => referrals.referral_type_id === 1
    );
    // @ts-ignore
    indirectReferrals = users.referrals.filter(
      (referrals: any) => referrals.referral_type_id === 2
    );
    totalReferral = directReferrals.length + indirectReferrals.length;
    totalUsers = { cardName: "Total users", amount: totalReferral };
    // @ts-ignore
    totalFunds = {
      cardName: "Total Funds",
      amount: totalBalance.total_balance,
    };
  }

  return (
    <main>
      <div className="p-4 h-screen flex gap-4 flex-col md:flex-row">
        <div className="w-full  flex flex-col gap-8">
          {/* Admin CARDS */}
          <div className="flex gap-4 justify-between flex-wrap">
            <AdminCard data={totalUsers} />
            <AdminCard data={totalFunds} />
            {/* <AdminCard data={data1} /> */}
          </div>

          <div>
            <h1 className="text-xl text-mlmSkyBg font-bold text-center p-4 bg-mlmSkyLight">
              {" "}
              Total Referrals
            </h1>
            <div className="flex gap-4 flex-col md:flex-row">
              <div className="w-full h-[450px]">
                <CountChart
                  name={"Direct "}
                  reffrals={directReferrals.length}
                />
              </div>
              <div className="w-full h-[450px]">
                <CountChart
                  name={"Indirect"}
                  reffrals={indirectReferrals.length}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Page;
