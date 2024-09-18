"use client";
import { Button } from "@/components/ui/button";
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
  firstName: z.string(),
  lastName: z.string(),
  idNumber: z.string(),
  country: z.string(),
  bankName: z.string(),
  iban: z.string(),
  contact: z.string(),
  status: z.string(),
  user_id: z.number(),
});

function NewWithdrawal() {
  const { data: session } = useSession();
  // @ts-ignore
  const senderId: number = session?.user?.id;
  // @ts-ignore
  const userBalance = session?.user?.balance;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      withdrawal_amount: "",
      firstName: "",
      lastName: "",
      idNumber: "",
      country: "",
      bankName: "",
      iban: "",
      contact: "",
      status: "Pending",
      user_id: senderId,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    if (userBalance < data.withdrawal_amount) {
      toast("Insufficient balance", { type: "error" });
    } else {
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
    }
  };
  return (
    <div className="grid justify-center">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="md:w-96 space-y-6"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>National Id/Passport Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="National Identity/Passport Number"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Country" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Bank Name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="contact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Iban" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input type="number" placeholder="Enter Amount" {...field} />
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
  );
}

export default NewWithdrawal;
