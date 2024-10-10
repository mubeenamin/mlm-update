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
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Account number must be at least 2 characters.",
  }),
  amount: z.string().min(2, {
    message: "Amount must be at least 2 characters.",
  }),
  user_id: z.number(),
});
function FundTransfer() {
  const { data: session, status } = useSession();
  // @ts-ignore
  const userId: number = session?.user?.id;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      amount: "",
      user_id: userId,
    },
  });
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await axios.post("/api/routers/fund/create_fund", data);
      if (!res) {
        throw new Error(`HTTP error! status:`);
      } else {
        form.reset();
        toast("Fund Transfered Successfully", { type: "success" });
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-5"
        >
          <h1 className="text-2xl font-bold ">Fund Transfer</h1>
          <div className="w-96 space-y-4 gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormControl>
                    <Input placeholder="Enter user id" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter Your Amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button
              type="submit"
              className="bg-mlmSky hover:bg-mlmSkyLight text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}

export default FundTransfer;
