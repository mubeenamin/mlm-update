"use client"
import React, { useEffect, useState } from 'react'
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

const page = () => {
const [open, setOpen] = useState(false)
const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/fastapi/api/routers/notification/notifications", {
          mode: "no-cors",
        });
        console.log(res)
        if (!res.ok) {
          // res.ok returns false if the HTTP status is not 200-299
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchData();
  }, []);

const handleToggle = () => {
    setOpen(!open);
  };
    
  return (
    <div className='flex flex-col place-items-center p-4  '>
    <div className="relative flex place-items-center inline-flex w-fit">
    <div className="absolute bottom-auto left-auto right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-2/4 rotate-0 skew-x-0 skew-y-0 scale-x-100 scale-y-100 whitespace-nowrap rounded-full bg-indigo-700 px-2.5 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
      99+
    </div>
    <button
      type="button"
      onClick={handleToggle}
      className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
      data-twe-ripple-init=""
      data-twe-ripple-color="light"
    >
     {open ? 'Close' : 'Open'} Notification
    </button>
  </div>

  {open && <div className='mt-8 '>

{users.map((user: any) => (
  <h1 className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
    {user.title}
  </h5>
  <p className="font-normal text-gray-700 dark:text-gray-400">
   {user.message}
  </p>
</h1>
))}
  
  </div>
  }
  
  </div>
  )
}

export default page