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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  package: z.string({ required_error: "Please select a package" }),
  role: z.string(),
  date: z.string(),
});
function SignUp() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nation_id: "",
      email: "",
      password: "",
      city: "",
      country: "",
      phone: "",
      currency: "USD",
      package: "",
      role: "user",
      date: Date.now().toString(),
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
      package: "",
    });
  };
  async function onSubmit(data: z.infer<typeof formSchema>) {
   
    try {
      const res = await fetch("/api/create_users", {
        method: "POST",        
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nation_id: data.nation_id,
          email: data.email,
          password: data.password,
          phone: data.phone,
          currency: data.currency,
          country: data.country,
          city: data.city,
          package: data.package,
          role: data.role,
          created_at: data.date,
        }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      } else {
        console.log(await res.json());
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }

    handleReset();
  }

  return (
    <main className="space-y-4 mt-6">
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-max-full gap-8 space-y-8"
          >
            <div className="w-80 gap-4">
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
              <FormField
                control={form.control}
                name="package"
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
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Gold Plus">Gold Plus</SelectItem>
                        <SelectItem value="Diamond">Diamond</SelectItem>
                        <SelectItem value="Diamond Plus">
                          Diamond Plus
                        </SelectItem>
                        <SelectItem value="Platinum">Platinum</SelectItem>
                        <SelectItem value="Platinum Plus">
                          Platinum Plus
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
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
        </Form>
      </div>
    </main>
  );
}

export default SignUp;
