"use client";
import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { useSession } from "next-auth/react";

function UserView() {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/fastapi/api/routers/user/me", {
          mode: "no-cors",
        });
        if (!res.ok) {
          // res.ok returns false if the HTTP status is not 200-299
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchData();
  }, []);
  const headName = {
    id: "ID",
    national_id: "National ID",
    email: "Email",
    password: "Password",
    Phone: "Phone",
    package: "Package",
    currency: "Currency",
    pin: "Pin",
  };

  return (
    <main>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{headName.id}</TableHead>
            <TableHead>{headName.national_id}</TableHead>
            <TableHead>{headName.email}</TableHead>
            <TableHead>{headName.password}</TableHead>
            <TableHead>{headName.Phone}</TableHead>
            <TableHead>{headName.package}</TableHead>
            <TableHead>{headName.currency}</TableHead>
            <TableHead>{headName.pin}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.nation_id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="">{user.password}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.package}</TableCell>
              <TableCell>{user.currency}</TableCell>
              <TableCell>
                {user.pin ? user.pin.pin : "Pin not available"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

export default UserView;
