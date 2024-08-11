"use client";

import { createContext, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCookie, getCookie, deleteCookie } from "cookies-next";
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const login = async (email: string, password: string) => {
    try {
      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", password);
      const res = await axios.post("/api/routers/auth/token", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.access_token}`;

      setCookie("token", res.data.access_token, { path: "/" });
      console.log(res.data.access_token);
      setUser(res.data);

      router.push("/admin/dashboard");
    } catch (error) {
      console.log("Login Failed", error);
    }
  };
  const logout = async () => {
    try {
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
      deleteCookie("token", { path: "/" });
      router.push("/signIn");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
