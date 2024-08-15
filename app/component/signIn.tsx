"use client";
import {} from "@hookform/resolvers/zod";
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
import { useContext, useState } from "react";

import AuthContext from "../context/AuthContext";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(2, {
    message: "Enter your password",
  }),
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [invalidUser, setinvalidUser] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    login(data.email, data.password);
    handleReset();
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
    <main className="flex min-h-screen flex-col items-center justify-between">
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
                  <Input
                   type="password" 
                   placeholder="Enter Your Password" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div>
            <p className="text-red-500">
              {invalidUser && "Wrong email or password"}
            </p>
          </div>
          <Button type="submit" className="bg-pink">
            {loading ? <>loading....</> : <span>Login</span>}
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default SignIn;
