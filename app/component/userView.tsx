import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

function UserView() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://mlm-update-blush.vercel.app/api/users");
      const data = await res.json();
      setUsers(data);
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
        <TableHead>
          <TableRow>
            <TableCell>{headName.id}</TableCell>
            <TableCell>{headName.email}</TableCell>
            <TableCell>{headName.package}</TableCell>
            <TableCell>{headName.currency}</TableCell>
            <TableCell>{headName.pin}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user: any) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}

export default UserView;
