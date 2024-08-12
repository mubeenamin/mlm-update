import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import UserView from "@/app/component/userView";
import { getUser } from "@/lib/apiCalling";

export default async function Page() {
  const res = await getUser();

  return (
    <div>
      <UserView data={res} />
    </div>
  );
}
