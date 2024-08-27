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

const FormSchema = z.object({
  account_number: z.string().min(2, {
    message: "Account number must be at least 2 characters.",
  }),
  Amount: z.string().min(2, {
    message: "Amount must be at least 2 characters.",
  }),
});

const onSubmit = (data: z.infer<typeof FormSchema>) => {
  console.log(data);
};

function FundTransfer() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      
      account_number: "",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-5"
        >
          <h1 className="text-2xl font-bold ">Fund Transfer</h1>
          <div className="w-96 space-y-4 gap-4">
          <FormField
          
                control={form.control}
                name="account_number"
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
                name="Amount"
                render={({ field }) => (
                  <FormItem className="gap-4">
                   
                    <FormControl>
                      <Input placeholder="Enter Your Amount" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
          </div>
          <div>
          <Button type="submit" className="bg-lamaYellow hover:bg-lamaPurple">
                  Submit
                </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}

export default FundTransfer;
