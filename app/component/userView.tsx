import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";

function UserView() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "/api/users",{mode:'no-cors'}
        );
        if (!res.ok) {
          // res.ok returns false if the HTTP status is not 200-299
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const headName = {
    id: "ID",
    email: "Email",
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
            <TableHead>{headName.email}</TableHead>
            <TableHead>{headName.package}</TableHead>
            <TableHead>{headName.currency}</TableHead>
            <TableHead>{headName.pin}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.package_id}</TableCell>
              <TableCell>{user.currency}</TableCell>
              <TableCell>{user.pin_id}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

export default UserView;
