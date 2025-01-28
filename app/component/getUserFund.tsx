// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Mail, Receipt } from "lucide-react";
// import { useSession } from "next-auth/react";

// function GetUserFund() {
//   const { data: session } = useSession();
//   // @ts-ignore
//   const user_id = session?.user?.id;
//   const [funds, setFunds] = useState([]);
//   const formattedDateTime = (date: any) => {
//     const timestamp = Number(date);
//     const d = new Date(timestamp);
//     const formateDate = d.toLocaleString();
//     return formateDate;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(
//           `/api/routers/fund/get_fund_by_user_id/${user_id}`
//         );
//         if (!res) {
//           throw new Error(`HTTP error! status: ${res}`);
//         } else {
//           console.log(res.data);
//           setFunds(res.data);
//         }
//       } catch (error) {}
//     };
//     fetchData();
//   }, [user_id]);

//   return (
//     <main>
//       <div className="flex flex-col ">
//         <div className="overflow-x-auto">
//           <div className="min-w-full inline-block align-middle">
//             <div className="overflow-hidden">
//               <table className="min-w-full rounded-xl">
//                 <thead>
//                   <tr className="bg-gray-50 text-center">
//                     <th
//                       scope="col"
//                       className="p-5  text-sm leading-6 font-semibold text-gray-900 capitalize"
//                     >
//                       Transfer to
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-5  text-sm leading-6 font-semibold text-gray-900 capitalize"
//                     >
//                       Amount Transferred
//                     </th>
//                     <th
//                       scope="col"
//                       className="p-5  text-sm leading-6 font-semibold text-gray-900 capitalize"
//                     >
//                       Date
//                     </th>
//                   </tr>
//                 </thead>
//                 {funds.length === 0 ? (
//                   <tbody>
//                     <tr>
//                       <td
//                         className="p-5 text-center text-xl leading-6 font-medium text-[#9CA3AF]"
//                         colSpan={3}
//                       >
//                         <div className="flex justify-center">
//                           <div>
//                             Record not found
//                             <div className="flex justify-center">
//                               <Receipt
//                                 color="#9CA3AF"
//                                 size={100}
//                                 className="justify-center"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </td>
//                     </tr>
//                   </tbody>
//                 ) : (
//                   funds
//                     .slice(0)
//                     .reverse()
//                     .map((fund: any) => (
//                       <tbody
//                         className="divide-y divide-gray-300 text-center"
//                         key={fund.id}
//                       >
//                         <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
//                           <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
//                             {fund.email}
//                           </td>
//                           <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
//                             {fund.amount}
//                           </td>
//                           <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
//                             {formattedDateTime(fund.date)}
//                           </td>
//                         </tr>
//                       </tbody>
//                     ))
//                 )}
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

// export default GetUserFund;
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Receipt } from "lucide-react";
import { useSession } from "next-auth/react";

function GetUserFund() {
  const { data: session } = useSession();
  // @ts-ignore
  const user_id = session?.user?.id;
  const [funds, setFunds] = useState([]);

  const formattedDateTime = (date: any) => {
    // Check if the date is a valid timestamp or ISO string
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return "Invalid Date"; // Handle invalid dates gracefully
    }
    return parsedDate.toLocaleString(); // Format the date
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/routers/fund/get_fund_by_user_id/${user_id}`
        );
        if (!res) {
          throw new Error(`HTTP error! status: ${res}`);
        } else {
          console.log(res.data);
          setFunds(res.data);
        }
      } catch (error) {
        console.error("Error fetching funds:", error);
      }
    };
    fetchData();
  }, [user_id]);

  return (
    <main>
      <div className="flex flex-col ">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full rounded-xl">
                <thead>
                  <tr className="bg-gray-50 text-center">
                    <th
                      scope="col"
                      className="p-5  text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Transfer to
                    </th>
                    <th
                      scope="col"
                      className="p-5  text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Amount Transferred
                    </th>
                    <th
                      scope="col"
                      className="p-5  text-sm leading-6 font-semibold text-gray-900 capitalize"
                    >
                      Date
                    </th>
                  </tr>
                </thead>
                {funds.length === 0 ? (
                  <tbody>
                    <tr>
                      <td
                        className="p-5 text-center text-xl leading-6 font-medium text-[#9CA3AF]"
                        colSpan={3}
                      >
                        <div className="flex justify-center">
                          <div>
                            Record not found
                            <div className="flex justify-center">
                              <Receipt
                                color="#9CA3AF"
                                size={100}
                                className="justify-center"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  funds
                    .slice(0)
                    .reverse()
                    .map((fund: any) => (
                      <tbody
                        className="divide-y divide-gray-300 text-center"
                        key={fund.id}
                      >
                        <tr className="bg-white transition-all duration-500 hover:bg-gray-50">
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {fund.email}
                          </td>
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {fund.amount}
                          </td>
                          <td className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                            {formattedDateTime(fund.date)}
                          </td>
                        </tr>
                      </tbody>
                    ))
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GetUserFund;
