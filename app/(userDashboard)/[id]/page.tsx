"use client";

import React, { useEffect, useState } from "react";


type Prop = {
  id: number;
};

function Page({ params }: { params: { id: Prop } }) {
  const userdata =  params.id;
  const userID= Number(userdata)
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      console.log(userID)
      try {
        const res = await fetch(`/api/single_users/${userID}`, { mode: "no-cors" });
        if (!res.ok) {
          // res.ok returns false if the HTTP status is not 200-299
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data)
      } catch (error) {
        
      }
    };
    fetchData();
  }, []);

  
  return <div> </div>;
}

export default Page;
