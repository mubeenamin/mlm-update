"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { IoMdSend } from "react-icons/io";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Account number must be at least 2 characters.",
  }),
  amount: z.string().min(2, {
    message: "Amount must be at least 2 characters.",
  }),
  user_id: z.number(),
  date: z.string(),
});

function NewFundTransfer() {
  const { data: session, status } = useSession();
  // @ts-ignore
  const userId: number = session?.user?.id;
  // @ts-ignore
  const userBalance = session?.user?.balance;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      amount: "",
      date: Date.now().toString(),
      user_id: userId,
    },
  });
  const balanceUpdate = async (updatedBalance: number) => {
    try {
      const res = await axios.put(
        `/api/routers/balance/update_balance_by_id/${userId}`,
        { balance: updatedBalance }
      );
      if (!res) {
        throw new Error(`HTTP error! status:`);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-mlmSkyLight text-white">New Fund Transfer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="grid justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="md:w-96 space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter User Name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Amount"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-mlmSky hover:bg-mlmSkyLight text-white"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NewFundTransfer;
