"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import ProtectedRoute from "./protectedRoute";



function NotificationView() {
  const [showdata, setdata] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("fastapi/api/routers/notification/notifications", { mode: "no-cors" });
        console.log(res);
        if (!res.ok) {
          // res.ok returns false if the HTTP status is not 200-299
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setdata(data);
        setLoading(false);
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    fetchData();
  }, []);
  const headName = {
   
    title : "title",
    message : "message",
    
  };
  return (
    
      <main>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{headName.title}</TableHead>
              <TableHead>{headName.message}</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {showdata.map((data: any) => (
              <TableRow key={data.id}>
                <TableCell>{data.title}</TableCell>
                <TableCell>{data.message}</TableCell>
                
               
</TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
    
  );
}

export default NotificationView;
