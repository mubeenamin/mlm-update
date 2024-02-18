"use client";
import { useEffect, useState } from "react";
import UserView from "./userView";
function User() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://mlm-update-blush.vercel.app/api/users");
      const data = await res.json();
      setUsers(data);
    };

    fetchData();
  }, []);
  return (
    <>
      {JSON.stringify(users)}
    </>
  );
}

export default User;
