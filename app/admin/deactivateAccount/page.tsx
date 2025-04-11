"use client";
import GetUserStatus from "@/app/component/getUserStatus";
import React, { useEffect, useState } from "react";

export default function DeactivateAccount() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/routers/user/users");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        } else {
          const data = await res.json();

          setUserData(data);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <GetUserStatus userData={userData} />
    </div>
  );
}
