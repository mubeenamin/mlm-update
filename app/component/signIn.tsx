"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(2, {
    message: "Enter your password",
  }),
});

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [invalidUser, setinvalidUser] = useState(false);
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await fetch(
        `/api/login_users?email=${data.email}&password=${data.password}`,
        {
          mode: "no-cors",
        }
      );
      if (!res.ok) {
        // res.ok returns false if the HTTP status is not 200-299

        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const newdata = await res.json();
      if (
        data.email === newdata.email &&
        data.password === newdata.password &&
        newdata.role === "admin"
      ) {
        router.push("/dashboard");
      } else if (
        data.email === newdata.email &&
        data.password === newdata.password &&
        newdata.role === "user"
        
      ) {
        router.push(`/${newdata.id}`);
      } else {
        setinvalidUser(true);
      }
      setLoading(true);
      handleReset();
    } catch (error) {
      setinvalidUser(true);
    }
  };
  const handleReset = () => {
    form.reset({
      email: "",
      password: "",
    });
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center  justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-14 mt-4 shadow-xl"
        >
          <h1 className="text-4xl font-bold ">OPUS GLOBAL</h1>
          <h1 className="text-3xl text-slate-900 font-medium text-center">
            Login
          </h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter you email" {...field} />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Password" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div>
            <p className="text-red-500">
              {" "}
              {invalidUser && "Wrong email or password"}
            </p>
          </div>
          
          <Button
            type="submit"
            className="bg-red-500/70 hover:bg-red-500/90 text-white"
          >
            {loading ? <>loading....</> : <span>Login</span>}
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default SignIn;
