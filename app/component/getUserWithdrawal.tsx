import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { Mail } from "lucide-react";

interface Withdrawal {
  id: string;
  user_id: string;
  firstName: string;
  lastName: string;
  idNumber: string;
  country: string;
  bankName: string;
  contact: string;
  iban: string;
  withdrawal_amount: string;
  status: string;
}

const columnHelper = createColumnHelper<Withdrawal>();

function GetUserWithdrawal({ withdraw_data }: { withdraw_data: Withdrawal[] }) {
  const columns = [
    columnHelper.accessor("user_id", {
      header: "User Id",
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
    columnHelper.accessor("idNumber", {
      header: "National Id/ Passport",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("country", {
      header: "Country",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("bankName", {
      header: "Bank Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("contact", {
      header: "Contact",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("iban", {
      header: "IBan",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("withdrawal_amount", {
      header: "Amount",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: withdraw_data.slice(0).reverse(),
    columns,
    getCoreRowModel: getCoreRowModel(),
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
                          className="p-2 text-sm leading-6 font-semibold text-gray-900 capitalize text-center"
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

                {table.getRowModel().rows.length === 0 ? (
                  <tbody>
                    <tr>
                      <td
                        className="p-5 text-center text-xl leading-6 font-medium text-[#9CA3AF]"
                        colSpan={columns.length}
                      >
                        <div className="flex justify-center">
                          <div>
                            Withdrawal not found
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
                  </tbody>
                ) : (
                  <tbody className="divide-y divide-gray-300">
                    {table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className="bg-white transition-all duration-500 hover:bg-gray-50 text-center border"
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="p-2 whitespace-nowrap text-sm leading-6 font-medium text-gray-900"
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
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default GetUserWithdrawal;
