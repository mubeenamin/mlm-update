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
    old_password: z.string().min(6, {
        message: "Old password must be at least 2 characters.",
      }),
  create_new_password: z.string().min(6, {
    message: "New password must be at least 2 characters.",
  }),
  confirm_new_password: z.string().min(6, {
    message: "Confirm new password must be at least 2 characters.",
  }),
});

const onSubmit = (data: z.infer<typeof FormSchema>) => {
  console.log(data);
};

function ChangePassword() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      old_password: "",
      create_new_password: "",
      confirm_new_password: "",
    },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-5"
        >
          <h1 className="text-2xl font-bold ">Password Change</h1>
          <div className="w-70 space-y-4 gap-4">
          <FormField
          
          control={form.control}
          name="old_password"
          render={({ field }) => (
            <FormItem className="gap-4">
             
              <FormControl>
                <Input placeholder="Enter your Old Password" {...field} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
          <FormField
          
                control={form.control}
                name="create_new_password"
                render={({ field }) => (
                  <FormItem className="gap-4">
                   
                    <FormControl>
                      <Input placeholder="Enter your New Password" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="confirm_new_password"
                render={({ field }) => (
                  <FormItem className="gap-4">
                   
                    <FormControl>
                      <Input placeholder="Confirm Password" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
          </div>
          <div>
          <Button type="submit" className="bg-pink">
                  Submit
                </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}

export default ChangePassword;
