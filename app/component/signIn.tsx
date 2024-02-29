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


const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(2, {
    message: "Enter your password",
  }),
});


const SignIn = () => {
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
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
      if (data.email === newdata.email && data.password === newdata.password) {
        console.log("successfull");
        router.push("/dashboard");
      } else {
        console.log("wrong username or password");
      }
      handleReset();
    } catch (error) {}
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
    <>
    <div className="mt-4 p-4  bg-black">
    <h1 className="text-4xl text-white font-bold ">OPUS GLOBAL</h1></div>
    <main className="flex min-h-screen flex-col items-center  justify-between">
      
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-5 mt-8"
        >
          <h1 className="text-4xl text-slate-900 font-medium">Login</h1>
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

          <Button
            type="submit"
            className="border-2 p-2 rounded-xl bg-blue-500 text-slate-800 hover:bg-blue-600 hover:text-slate-900"
          >
            Login
          </Button>
          
          <Button
            
            className="border-2 p-2 rounded-xl bg-blue-500 text-slate-800 hover:bg-blue-600 hover:text-slate-900"
          >
          <Link href="/signUp">  signUp </Link>
          </Button>

        </form>
      </Form>
    </main>
    </>
  );
};

export default SignIn;
