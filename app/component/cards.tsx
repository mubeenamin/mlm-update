import { Card } from '@tremor/react'
import React from 'react'
import Chart from './chart'

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
        <Card className="p-8 shadow-md grid grid-cols-3 items-center">
          <div className="col-span-2 text-lg">Daily Profit from Package</div>
          <div className="col-span-1 text-end text-4xl">{users.balance}</div>
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
  )
}

export default CardsUser