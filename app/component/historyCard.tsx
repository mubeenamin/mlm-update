// components/DashboardCard.tsx
import Link from "next/link";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface HistoryCardProps {
  title: string;
  value: string;
  href: string;
  trend?: "up" | "down"; // Optional trend indicator
}

const HistoryCard = ({ title, value, href, trend }: HistoryCardProps) => {
  return (
    <Link href={href}>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
              {title}
            </h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {value}
            </p>
          </div>

          {trend && (
            <span
              className={`p-2 rounded-full ${trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
            >
              {trend === "up" ? (
                <ArrowUpRight className="w-5 h-5" />
              ) : (
                <ArrowDownRight className="w-5 h-5" />
              )}
            </span>
          )}
        </div>

        {/* Optional: Add more content or indicators here */}
        <div className="mt-4">
          <span className="inline-flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium group-hover:underline">
            View details
            <ArrowUpRight className="ml-1 w-4 h-4" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HistoryCard;
