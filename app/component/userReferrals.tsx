"use client";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  Balances: {
    balance: string;
    package: string;
  };
  fund: Array<{
    amount: string;
  }>;
};

const columns: ColumnDef<User>[] = [
  {
    header: "Name",
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Country",
    accessorKey: "country",
  },
  {
    header: "City",
    accessorKey: "city",
  },
  {
    header: "Balance",
    accessorFn: (row) => parseFloat(row.Balances.balance),
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return `$${value.toFixed(2)}`;
    },
  },
  {
    header: "Package",
    accessorKey: "Balances.package",
  },
  {
    header: "Total Fund",
    accessorFn: (row) =>
      row.fund.reduce((sum, entry) => sum + parseFloat(entry.amount), 0),
    cell: ({ getValue }) => {
      const value = getValue() as number;
      return `$${value.toFixed(2)}`;
    },
  },
];

export default function UserReferrals({ data }: { data: User[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4">
      <div className="rounded-md border shadow-md">
        <table className="w-full">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
