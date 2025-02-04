"use client";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState, useEffect } from "react";
import { redirect } from "next/navigation";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLoading } from "@/redux/loader/LoadingSlice";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, "Password is required"),
});

const SignIn = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.LoadingReducer);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { email: "", password: "" },
  });

  // Handle session redirects
  useEffect(() => {
    if (status === "authenticated") {
      const redirectPath =
        session?.user?.name === "admin"
          ? "/admin/dashboard"
          : "/user/dashboard";
      redirect(redirectPath);
    }
  }, [status, session]);

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    dispatch(setLoading(true));
    setErrorMessage("");

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        // Handle specific error messages from server
        const errorMessage = result.error.replace("Error: ", "");
        setErrorMessage(errorMessage);

        // Show specific toast messages based on error type
        if (errorMessage.includes("connection")) {
          toast.error("Server connection failed. Please try again later.");
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.success("Login successful");
        // Reset form only on successful login
        form.reset();
      }
    } catch (error: any) {
      setErrorMessage("An unexpected error occurred");
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <main>
      {loading && <Loader />}
      <div className="w-full max-w-md p-8 space-y-6 rounded shadow-md">
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

          {errorMessage && (
            <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
          )}

          <Button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-mlmSky rounded-md hover:bg-mlmSkyLight focus:outline-none focus:ring focus:ring-pink/80"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Login"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
