"use client";

import CardsUser from "@/app/component/cards";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
type Prop = {
  id: number;
};

function Page() {
  const { data: session } = useSession();
  
  const userdata = session?.user?.id;
  const userID: number = Number(userdata);
  const [users, setUsers] = useState({
    nation_id: "",
    email: "",
    password: "",
    phone: "",
    currency: "",
    country: "",
    city: "",
    package: "",
    role: "",
    created_at: "",
    referral_id: null,
    id: null,
  });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {

        const res = await fetch(`/api/routers/user/${userID}`, {

          mode: "no-cors",
        });
        if (!res.ok) {
          // res.ok returns false if the HTTP status is not 200-299
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUsers(data);
        console.log(data);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return (
    <>
      <CardsUser users={users} />
    </>
  );
}

export default Page;
