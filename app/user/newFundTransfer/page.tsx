"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

const FormSchema = z.object({
  email: z.string().min(2, {
    message: "Account number must be at least 2 characters.",
  }),
  amount: z.string().min(1, {
    message: "Amount must be at least 1 character.",
  }),
  user_id: z.number(),
  date: z.string(),
});

function FundTransfer() {
  const { data: session, status } = useSession();
  // @ts-ignore
  const userId: number = session?.user?.id as number; // Ensure userId is correctly typed
  console.log(userId);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState<z.infer<typeof FormSchema> | null>(
    null
  );

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      amount: "",
      user_id: userId,
      date: new Date().toISOString(),
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    setFormData(data);
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed: boolean) => {
    setShowConfirmation(false);
    if (confirmed && formData) {
      try {
        const res = await axios.post("/api/routers/fund/create_fund", formData);
        if (res.status === 200) {
          form.reset();
          toast.success("Fund Transferred Successfully");
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        toast.error("Failed to transfer funds");
      }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-5"
        >
          <h1 className="text-2xl font-bold">Fund Transfer</h1>
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

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Confirm Transfer</h2>
            <p>Are you sure you want to transfer funds?</p>
            <div className="flex justify-end gap-4 mt-4">
              <Button
                onClick={() => handleConfirmation(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                No
              </Button>
              <Button
                onClick={() => handleConfirmation(true)}
                className="bg-mlmSky hover:bg-mlmSkyLight text-white"
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default FundTransfer;
