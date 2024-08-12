"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

export default function ProtectedRoute({ children }: any) {
  const router = useRouter();

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      router.push("/signIn");
    }
  }, [user, router]);

  return user ? children : null;
}
