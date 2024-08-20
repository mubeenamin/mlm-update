"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";

export default function Toast() {
  const params = useSearchParams();
  const [hasShownLoginMessage, setHasShownLoginMessage] = useState(false);

  useEffect(() => {
    const error = params?.get("error");
    if (error && error !== "") {
      toast.error("oops Invalid credentials  ", { theme: "colored" });
    } else if (!hasShownLoginMessage) {
      toast.info("Please login", { theme: "colored" });
      setHasShownLoginMessage(true);
    }
  }, [params, hasShownLoginMessage]);

  return (
    <div>
      <ToastContainer />
    </div>
  );
}
