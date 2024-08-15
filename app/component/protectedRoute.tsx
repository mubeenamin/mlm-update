"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { getCookie } from "cookies-next";
import axios from "axios";

export default function ProtectedRoute({ children }: any) {
  const router = useRouter();

  const { user } = useContext(AuthContext);
  const [newUser, setNewUser] = useState<any>(user);
  useEffect(() => {
    if (!newUser) {
      const token = getCookie("token");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setNewUser(token);
      } else {
        router.push("/");
      }
    }
  }, [newUser, router]);

  return newUser ? children : null;
}
