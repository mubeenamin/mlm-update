// components/AllAccountHistory.tsx
"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import axios from "axios";

interface AccountHistory {
  id: number;
  date: string;
  user_name: string;
  status: "Success" | "Pending" | string;
  amount: number;
  user_id: number | null;
  action_description: string;
}

const AllAccountHistory = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [data, setData] = useState<AccountHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const [response] = await Promise.all([
          axios.get<AccountHistory[]>("/api/routers/audit_log/logs"),
          new Promise((resolve) => (timeoutId = setTimeout(resolve, 1000))),
        ]);

        setData(response.data);
        setHasError(false);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );

  const columnHelper = createColumnHelper<AccountHistory>();
  const columns = [
    columnHelper.accessor("date", {
      header: "Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("user_name", {
      header: "User Name",
    }),

    columnHelper.accessor("amount", {
      header: "Amount",
      cell: (info) => `$${info.getValue().toLocaleString()}`,
    }),
    columnHelper.accessor("action_description", {
      header: "Description",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            info.getValue() === "Success"
              ? "bg-green-100 text-green-800"
              : info.getValue() === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          {info.getValue()}
        </span>
      ),
    }),
    // columnHelper.accessor("user_id", {
    //   header: "User ID",
    //   cell: (info) => info.getValue() ?? "N/A",
    // }),
  ];

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="p-4 max-w-7xl mx-auto">
      {isLoading ? (
        <LoadingSpinner />
      ) : hasError ? (
        <div className="text-center py-8 text-red-600">
          Failed to load data. Please try again later.
        </div>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: "↑",
                          desc: "↓",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm text-gray-900 whitespace-normal break-words max-w-[200px]"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllAccountHistory;
