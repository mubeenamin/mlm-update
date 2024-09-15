"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
import axios from "axios";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  withdrawal_amount: z.string(),
  email: z.string(),
  iban: z.string(),
  status: z.string(),
  user_id: z.number(),
});

function NewWithdrawal() {
  const { data: session } = useSession();
  // @ts-ignore
  const senderId: number = session?.user?.id;
  // @ts-ignore
  const sender_email: string = session?.user?.email;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      withdrawal_amount: "",
      email: sender_email,
      iban: "",
      status: "Pending",
      user_id: senderId,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    try {
      const res = await axios.post(
        "/api/routers/withdrawal/create_withdrawal",
        data
      );
      if (!res) {
        throw new Error(`HTTP error! status:`);
      } else {
        toast("Withdraw request sent successfully", { type: "success" });
        form.reset();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-mlmSkyLight text-white">Withdrawal</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="iban"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Iban Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Iban" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="withdrawal_amount"
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default NewWithdrawal;
