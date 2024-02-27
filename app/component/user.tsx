"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const formSchema = z.object({
  national_id: z.string().min(2, {
    message: "National ID must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  city: z.string(),
  country: z.string(),
  phone: z.string(),
  currency: z.string(),
  package: z.string(),
  // updated_at: z.string().datetime(),
  // created_at: z.string().datetime(),
});
function User() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      national_id: "",
      email: "",
      password: "",
      city: "",
      country: "",
      phone: "",
      currency: "USD",
      package: "",
      // country_id: 1,
      // pin_id: 1,
      // withdraw_id: 1,
      // updated_at: "", 
      // created_at: "",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
    <main className="space-y-4">
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-max-full gap-8 space-y-8"
          >
            <div className="w-80 gap-4">
              <FormField
                control={form.control}
                name="national_id"
                render={({ field }) => (
                  <FormItem className="gap-4">
                    <FormLabel>National ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter National ID" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="gap-4">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Email" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="gap-4">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Password" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="gap-4">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your City" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="gap-4">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Your Country" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="gap-4">
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Phone number" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="gap-4">
                    <FormLabel>Currency</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <div>
                <Button type="submit" className="bg-red-500/70">
                  Submit
                </Button>
              </div>
            </div>
          </form>
          <FormItem></FormItem>
        </Form>
      </div>
    </main>
  );
}

export default User;
