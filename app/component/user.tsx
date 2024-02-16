import React from "react";
import useSWR from "swr";

function User() {
  const { data, error } = useSWR("/api/users", fetch);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <div>{JSON.stringify(data)}</div>;
}

export default User;
