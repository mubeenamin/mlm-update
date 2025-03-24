"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Mail, Receipt } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Fund = {
  id: string;
  email: string;
  amount: number;
  date: string;
};

function GetUserFund() {
  const { data: session } = useSession();
  // @ts-ignore
  const user_id = session?.user?.id;
  const [funds, setFunds] = useState<Fund[]>([]);

  const formattedDateTime = (date: string) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) return "Invalid Date";
    return parsedDate.toLocaleString();
  };

  const columnHelper = createColumnHelper<Fund>();
  const columns = [
    columnHelper.accessor("email", {
      header: "Transfer to",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("amount", {
      header: "Amount Transferred",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => formattedDateTime(info.getValue()),
    }),
  ];

  const table = useReactTable({
    columns,
    data: [...funds].reverse(),
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/routers/fund/get_fund_by_user_id/${user_id}`
        );
        setFunds(res.data);
      } catch (error) {
        console.error("Error fetching funds:", error);
      }
    };
    fetchData();
  }, [user_id]);

  return (
    <main>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full rounded-xl">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-gray-50 text-center">
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="p-5 text-sm leading-6 font-semibold text-gray-900 capitalize"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {funds.length === 0 ? (
                    <tr>
                      <td
                        className="p-5 text-center text-xl leading-6 font-medium text-[#9CA3AF]"
                        colSpan={columns.length}
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
                  ) : (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="bg-white transition-all duration-500 hover:bg-gray-50 divide-y divide-gray-300"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900 text-center"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GetUserFund;
