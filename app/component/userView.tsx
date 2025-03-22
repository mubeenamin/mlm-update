// components/UserReferralTable.tsx
"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import axios from "axios";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  Balances: {
    balance: string;
    package: string;
  };
  country: string;
  city: string;
  referrals: Array<{ referred_user_id: number }>;
}

interface ProcessedUser {
  id: number;
  name: string;
  email: string;
  balance: string;
  package: string;
  country: string;
  city: string;
  referrer: string;
  referrals: string;
}

const UserView = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [visibleReferrals, setVisibleReferrals] = useState<Set<number>>(
    new Set()
  );
  const [data, setData] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const fetchData = async () => {
      try {
        const [response] = await Promise.all([
          axios.get<User[]>("/api/routers/user/users"),
          // Add minimum 1 second delay to prevent flash of loading spinner
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
  const toggleReferralVisibility = (userId: number) => {
    setVisibleReferrals((prev) => {
      const next = new Set(prev);
      if (next.has(userId)) {
        next.delete(userId);
      } else {
        next.add(userId);
      }
      return next;
    });
  };

  // Process data to resolve referrer and referrals
  const processedData = useMemo<ProcessedUser[]>(() => {
    return data.map((user) => {
      // Find referrer
      const referrerUser = data.find((u) =>
        u.referrals.some((r) => r.referred_user_id === user.id)
      );
      const referrer = referrerUser
        ? `${referrerUser.firstName} ${referrerUser.lastName}`
        : "None";

      // Find referrals
      const referredUsers = data.filter((u) =>
        user.referrals.some((r) => r.referred_user_id === u.id)
      );
      const referrals = referredUsers
        .map((u) => `${u.firstName} ${u.lastName}`)
        .join(", ");

      return {
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        balance: `$${parseFloat(user.Balances.balance).toLocaleString()}`,
        package: user.Balances.package,
        country: user.country,
        city: user.city,
        referrer,
        referrals,
      };
    });
  }, [data]);

  // Column definitions
  const columnHelper = createColumnHelper<ProcessedUser>();
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("name", {
      header: "Name",
    }),
    columnHelper.accessor("email", {
      header: "Email",
    }),
    columnHelper.accessor("balance", {
      header: "Balance",
    }),
    columnHelper.accessor("package", {
      header: "Package",
    }),
    columnHelper.accessor("referrer", {
      header: "Referrer",
    }),
    columnHelper.accessor("referrals", {
      header: "Referrals",
      cell: (info) => {
        const isVisible = visibleReferrals.has(info.row.original.id);
        return (
          <div className="flex items-center gap-2">
            {isVisible ? (
              <span>{info.getValue() || "None"}</span>
            ) : (
              <div className="text-gray-400">Hidden</div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleReferralVisibility(info.row.original.id);
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isVisible ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        );
      },
    }),
    columnHelper.accessor("country", {
      header: "Country",
    }),
    columnHelper.accessor("city", {
      header: "City",
    }),
  ];

  // Create table instance
  const table = useReactTable({
    data: processedData,
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
            {/* Keep existing table header code */}
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

            {/* Keep existing table body code */}
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

export default UserView;
