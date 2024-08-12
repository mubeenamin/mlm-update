import React from "react";
import UserView from "@/app/component/userView";

import { getUser } from "@/lib/apiCalling";

export default async function Dashboard() {
  return <UserView />;
}
