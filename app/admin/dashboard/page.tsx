"use client";

import CardsUser from "@/app/component/cards";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AdminCard from "@/app/component/admincard";
import CountChart from "@/app/component/CountChart";

function Page() {
  // const { data: session, status } = useSession();
  // // @ts-ignore
  // const userdata: number = session?.user?.id;

  // const [users, setUsers] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch(`/api/routers/user/single_user/${userdata}`, {
  //         mode: "no-cors",
  //       });

  //       if (!res.ok) {
  //         // res.ok returns false if the HTTP status is not 200-299
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       const data = await res.json();
  //       setUsers(data);
  //     } catch (error) { }
  //   };

  //   fetchData();
  // }, [userdata]);

  return (
    <main >

      <div className="p-4  h-full flex gap-4 flex-col md:flex-row">


        <div className="w-full  flex flex-col gap-8">

          {/* Admin CARDS */}
          <div className="flex gap-4 justify-between flex-wrap">
            <AdminCard data="total fund" />
            <AdminCard data="Total fund received" />
            <AdminCard data="Total referral" />

          </div>

          <div >
            <h1 className="text-xl text-mlmSkyBg font-bold text-center p-4 bg-mlmSkyLight">	Total referrals</h1>
            <div className="flex gap-4  flex-col lg:flex-row">
              {/* COUNT CHART */}
              <div className="w-full  lg:w-2/3 h-[450px]">
                <CountChart  name={"Direct "} reffrals={40} />
              </div>
               <div className="w-full lg:w-2/3 h-[450px]">
              <CountChart name={"InDirect"} reffrals={50} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        
      </div>
    </main>
  );
}

export default Page;
