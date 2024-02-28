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
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const onSubmit = () => {
  console.log("data" );
};

function FundTransfer() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-5"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="border-2 p-2 rounded-xl bg-slate-300 text-slate-800 hover:bg-slate-400 hover:text-slate-900">Submit</Button>
        </form>
      </Form>
    </main>
  );
}

export default FundTransfer;
