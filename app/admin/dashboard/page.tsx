import React from "react";
import UserView from "@/app/component/userView";

import { getUser } from "@/lib/apiCalling";

export default async function Dashboard() {
  const res = await getUser();
  return <UserView data={res} />;
}
