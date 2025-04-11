"use client";
import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Mail } from "lucide-react";
import UpdateUserStatus from "./updateUserStatus";

const columnHelper = createColumnHelper<any>();

function GetUserStatus({ userData }: any) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columns = [
    columnHelper.accessor("id", {
      header: "User ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("nation_id", {
      header: "National ID/ Passport",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("country", {
      header: "Country",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("phone", {
      header: "Contact",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => <UpdateUserStatus user_id={row.original.id} />,
    }),
  ];

  const table = useReactTable({
    data: userData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <main>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full rounded-xl">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="p-5 text-left text-sm leading-6 font-semibold text-gray-900 capitalize"
                          {...(header.id !== "actions"
                            ? {
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }
                            : {})}
                        >
                          <div
                            className={`flex items-center ${
                              header.column.getCanSort() ? "cursor-pointer" : ""
                            }`}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: " ↑",
                              desc: " ↓",
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="bg-white transition-all duration-500 hover:bg-gray-50 divide-y divide-gray-300"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="p-2 text-center whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="p-5 text-left text-xl leading-6 font-medium text-[#9CA3AF]"
                        colSpan={columns.length}
                      >
                        <div className="flex justify-center">
                          <div>
                            User not found
                            <div className="flex justify-center">
                              <Mail
                                color="#9CA3AF"
                                size={100}
                                className="justify-center"
                              />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
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

export default GetUserStatus;
