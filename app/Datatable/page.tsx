import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col mt-6">
    <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden">
            <h1 className='text-2xl font-semibold text-center text-mlmSky mb-4'>Daily Profit</h1>
          <table className="min-w-full">
            <thead className="bg-white border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Daily Profit
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Total Balance
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr className="bg-gray-100 border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  1
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  3.00 $
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  200.00 $
                </td>
               
              </tr>
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default page