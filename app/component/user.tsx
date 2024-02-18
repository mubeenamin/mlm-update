"use client";
import { useEffect, useState } from "react";
import UserView from "./userView";
function User() {
  const [users, setUsers] = useState([]);

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
      {users.map((user: any) => (
        <div key={user.id}>{user.id}</div>
      ))}
    </>
  );
}

export default User;
