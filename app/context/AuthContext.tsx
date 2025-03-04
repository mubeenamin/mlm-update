"use client";

import { createContext, useEffect, useState } from "react";
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

      localStorage.setItem("token", res.data.access_token);

      setCookie("token", res.data.access_token, { maxAge: 60 * 60 * 24 * 30 });
      setUser(res.data);
      console.log(res.data.access_token);
      router.push("/admin/dashboard");
    } catch (error) {
      console.log("Login Failed", error);
    }
  };

  useEffect(() => {
    // Check if the user is already logged in
    const token = getCookie("token");
    console.log(token);
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      // Optionally, you can fetch user data here and set it to the state
      setUser({ token }); // Simplified for demonstration
    }
  }, []);
  const logout = async () => {
    try {
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
      deleteCookie("token", { path: "/" });
      router.push("/");
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
