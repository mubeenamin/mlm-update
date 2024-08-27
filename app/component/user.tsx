"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSession } from "next-auth/react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment";
import { useRouter } from "next/navigation";

import axios from "axios";

const formSchema = z.object({
  nation_id: z.string().min(2, {
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
  userPackage: z.string({ required_error: "Please select a package" }),
  name: z.string(),
  created_at: z.string(),
  referrer_user_id: z.number(),
  referral_type_name: z.string(),
  initial_balance: z.number(),
});
function User() {
  const { data: session } = useSession();
  // @ts-ignore
  const referral_id = session?.user?.id;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nation_id: "",
      email: "",
      password: "",
      city: "",
      country: "",
      phone: "",
      userPackage: "",
      currency: "USD",
      name: "user",
      created_at: moment().format("YYYY-MM-DD"),
      referrer_user_id: referral_id,
      referral_type_name: "direct",
      initial_balance: 0,
    },
  });
  const handleReset = () => {
    form.reset({
      nation_id: "",
      email: "",
      password: "",
      city: "",
      country: "",
      phone: "",
      currency: "USD",
      userPackage: "",
    });
  };
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.userPackage === "Bronze") {
      data.initial_balance = 150;
    } else if (data.userPackage === "Silver") {
      data.initial_balance = 300;
    } else if (data.userPackage === "Gold") {
      data.initial_balance = 600;
    } else if (data.userPackage === "Gold Plus") {
      data.initial_balance = 1200;
    } else if (data.userPackage === "Diamond") {
      data.initial_balance = 2400;
    } else if (data.userPackage === "Diamond Plus") {
      data.initial_balance = 4800;
    } else if (data.userPackage === "Platinum") {
      data.initial_balance = 9600;
    } else if (data.userPackage === "Platinum Plus") {
      data.initial_balance = 19200;
    }

    // @ts-ignore
    if (session?.user?.balance < data.initial_balance) {
      alert("Insufficient Balance");
    } else {
      try {
        const res = await axios.post("/api/routers/user/create", data);

        if (!res) {
          throw new Error(`HTTP error! status:`);
        } else {
          console.log(await res.data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }

      handleReset();

      router.refresh();
    }
  };

  return (
    <main className="space-y-4">
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-max-full gap-8 space-y-10"
          >
            <FormField
              control={form.control}
              name="nation_id"
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
            <FormField
              control={form.control}
              name="userPackage"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel>Package</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Package" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="Bronze">Bronze $150</SelectItem>
                      <SelectItem value="Bronze Plus">
                        Bronze Plus $300
                      </SelectItem>
                      <SelectItem value="Gold">Gold $600</SelectItem>
                      <SelectItem value="Gold Plus">Gold Plus $1200</SelectItem>
                      <SelectItem value="Diamond">Diamond $2400</SelectItem>
                      <SelectItem value="Diamond Plus">
                        Diamond Plus $4800
                      </SelectItem>
                      <SelectItem value="Platinum">Platinum $9600</SelectItem>
                      <SelectItem value="Platinum Plus">
                        Platinum Plus $19200
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-red-800">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}

export default User;
