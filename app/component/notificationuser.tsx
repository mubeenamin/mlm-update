"use client";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IoIosNotifications } from "react-icons/io";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export function SheetDemo() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(0);
  const [newNotificationCount, setNewNotificationCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("/api/routers/notification/notifications", {
          mode: "no-cors",
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        } else {
          const data = await res.json();
          setUsers(data);
          setNewNotificationCount(data.length - notificationCount);
        }
        // console.log(res);
        // Update the new notification count
      } catch (error) {
        // console.error("An error occurred:", error);
      }
    }, 60000); // Check for new notifications every 5 seconds

    return () => clearInterval(interval);
  }, [notificationCount]);

  const handleToggle = () => {
    setOpen(!open);
    if (!open) {
      setNotificationCount(users.length); // Reset the notification count when opened
      setNewNotificationCount(0); // Reset the new notification count when opened
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" onClick={handleToggle}>
          <div className="relative flex place-items-center  w-fit">
            <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-red-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
              {newNotificationCount > 99 ? "99+" : newNotificationCount}
            </div>

            {open ? (
              <IoIosNotifications size={26} className="text-mlmSky" />
            ) : (
              <IoIosNotifications size={26} className="text-mlmSky" />
            )}
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="mt-8">
          {users.map((user: any) => (
            <h1
              key={user.id}
              className="block max-w-sm p-6 bg-mlmSkybg border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {user.title}
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {user.message}
              </p>
            </h1>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
