import { Card } from "@tremor/react";
import Link from "next/link";



function AccountHistory() {

  return (
    <main className="mt-4" >
      <div className="space-y-4 bg-white">
      <h1 className="text-3xl mt-4 font-bold text-center">Account History</h1>

        <div className="grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-8 shadow-md grid text-white items-center gap-8 bg-mlmSky rounded-md hover:bg-mlmSkyLight">
            <Link href={"/Datatable"} className="col-span-2 text-lg">
              DAILY PROFIT
            </Link>
            <div className="col-span-2 text-4xl text-end">

            </div>
          </Card>
          <Card className="p-8 shadow-md grid  items-center gap-8 bg-mlmSkyLight rounded-md">
            <div className="col-span-2 text-lg"> REFERRAL BONUS </div>
            <div className="col-span-2  text-4xl text-end">

            </div>
          </Card>
          <Card className="p-8 shadow-md grid  text-white items-center gap-8 bg-mlmSky rounded-md">
            <div className="col-span-2 text-lg">DIRECT PROFIT</div>
            <div className="col-span-2  text-4xl text-end">

            </div>
          </Card>
          <Card className="p-8 shadow-md grid  items-center bg-mlmSkyLight text-lg gap-8 rounded-md">
            <div className="col-span-2 text-lg">INDIRECT PROFIT</div>
            <div className="col-span-2 text-4xl text-end">

            </div>
          </Card>
          <Card className="p-8 shadow-md grid text-white  items-center bg-mlmSky hover:bg-mlmSkyLight text-lg gap-8 cursor-pointer rounded-md">
            <Link href={"/admin/cashWithdrawal"} className="col-span-2 text-lg ">CASH WITHDRAW </Link>
            <div className="col-span-2 text-4xl text-end">

            </div>
          </Card>
          <Card className="p-8 shadow-md grid  items-center  bg-mlmSkyLight text-lg gap-8 hover:bg-mlmSky cursor-pointer rounded-md">
            <Link href={"/admin/fundhistory"} className="col-span-2 text-lg">FUND TRANSFER </Link >
            <div className="col-span-2 text-4xl text-end"></div>
          </Card>
        </div>
      </div>

    </main>
  );
}

export default AccountHistory;
