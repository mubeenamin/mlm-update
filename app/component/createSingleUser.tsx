"use client";
import { useState } from "react";

import * as z from "zod";


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
const formSchema = z.object({
  national_id: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string(),
  currency: z.string(),
  city_id: z.number(),
  role_id: z.number(),
  referral_id: z.number(),
  package_id: z.number(),
  country_id: z.number(),
  pin_id: z.number(),
  withdraw_id: z.number(),
  updated_at: z.string().datetime(),
  created_at: z.string().datetime(),

})

function CreateSingleUser() {
  const [national_id, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currency, setCurrency] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/create_users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        national_id,
        email,
        phone,
        currency,
        city_id: 1,
        role_id: 1,
        referral_id: 1,
        package_id: 1,
        country_id: 1,
        pin_id: 1,
        withdraw_id: 1,
        updated_at: "string",
        created_at: "string",
      }),
    });
    const data = await response.json();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-5">
        <div>
          <label className="flex flex-col">
            National ID:
            <input
              type="text"
              value={national_id}
              onChange={(e) => setNationality(e.target.value)}
              className=" border-2"
            />
          </label>
        </div>
        <div>
          <label className="flex flex-col">
            Email:
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" border-2"
            />
          </label>
        </div>
        <div>
          <label className="flex flex-col">
            Phone:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className=" border-2"
            />
          </label>
        </div>
        <div>
          <label className="flex flex-col">
            Currency:
            <input
              type="text"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className=" border-2"
            />
          </label>
        </div>
        <div className="flex justify-center mt-10">
          <button
            type="submit"
            className="border-2 p-2 rounded-xl bg-slate-300 text-slate-800 hover:bg-slate-400 hover:text-slate-900"
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  );
}

export default CreateSingleUser;
