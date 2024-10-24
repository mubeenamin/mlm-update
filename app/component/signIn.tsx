"use client";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";

import Loader from "./Loader"; // Import the Loader component
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLoading } from "@/redux/loader/LoadingSlice";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(2, {
    message: "Enter your password",
  }),
});

const SignIn = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    if (session?.user?.name === "admin") {
      redirect("/admin/dashboard");
    } else {
      redirect("/user/dashboard");
    }
  }
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.LoadingReducer);
  const [invalidUser, setInvalidUser] = useState(false);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    dispatch(setLoading(true));
    const { email, password } = data;

    try {
      const res = await signIn("credentials", { email, password });
      // console.log(res);

      if (res?.error) {
        setInvalidUser(true);
        dispatch(setLoading(false));
      } else {
        toast("Login successful", { type: "success" });
      }
    } catch (error) {
      setInvalidUser(true);
      dispatch(setLoading(false));
    }

    handleReset();
  };

  const handleReset = () => {
    form.reset({
      email: "",
      password: "",
    });
  };

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <main>
      {loading && <Loader />}
      <div className="w-full max-w-md p-8 space-y-6  rounded shadow-md">
        <h1 className="text-4xl font-bold text-center">OPUS GLOBAL</h1>
        <h2 className="text-2xl font-medium text-center text-gray-700">
          Login
        </h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              {...form.register("email")}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...form.register("password")}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your password"
            />
            {form.formState.errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          {invalidUser && (
            <p className="mt-2 text-sm text-red-500">Wrong email or password</p>
          )}
          <Button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-mlmSky rounded-md hover:bg-mlmSkyLight focus:outline-none focus:ring focus:ring-pink/80"
            disabled={loading}
          >
            Login
          </Button>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
