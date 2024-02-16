"use client";
import React, { useEffect, useState } from "react";

function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://mlm-update-blush.vercel.app/api/users");
      const data = await res.json();
      console.log(data)
      setUsers(data);
    };

    fetchData();
  }, []);
  console.log(users);
  return (
    <div>
      {users.map((user) => (
        <div key={user}>{user}</div>
      ))}
    </div>
  );
}

export default User;
