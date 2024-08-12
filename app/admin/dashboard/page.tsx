import React from "react";
import UserView from "@/app/component/userView";

<<<<<<< HEAD
function Dashboard() {
  return (
    <div className="h-[calc(100vh-96px] rounded-lg p-4 bg-white">
     <UserView/>
    </div>
  );
}
=======
import { getUser } from "@/lib/apiCalling";
>>>>>>> c6427d8b177f041f6aa8c3a945361acfd260e794

export default async function Dashboard() {
  return <UserView />;
}
