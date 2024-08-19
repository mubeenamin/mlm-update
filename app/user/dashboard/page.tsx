"use client";

import CardsUser from "@/app/component/cards";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

function Page() {
  const { data: session, status } = useSession();
  // @ts-ignore
  const userdata: number = session?.user?.id;

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/fastapi/api/routers/user/single_user/${userdata}`,
          {
            mode: "no-cors",
          }
        );

        if (!res.ok) {
          // res.ok returns false if the HTTP status is not 200-299
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {}
    };

    fetchData();
  }, [userdata]);

  return (
    <main>
      <CardsUser users={users} />
    </main>
  );
}

export default Page;
