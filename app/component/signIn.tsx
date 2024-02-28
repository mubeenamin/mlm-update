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
  Email: z.string().min(2, {
    message: " message: Invalid email address",
  }),
  Password: z.string().min(2, {
    message: " message: Invalid email address",
  }),
});

const onSubmit = () => {
  console.log("data" );
};

const SignIn = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });
  return (
    <main className="flex min-h-screen flex-col items-center  justify-between">
      
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-5 mt-8"
        >
          <h1 className="text-4xl text-slate-900 font-medium">Login</h1>
          <FormField
            control={form.control}
            name="Email"
            render={({ field }) => (
              <FormItem>
                <FormLabel >Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter you email" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
              
            )}
            
          />
          <FormField
            control={form.control}
            name="Password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Your Password" {...field} />
                </FormControl>
                
                <FormMessage />
              </FormItem>
              
            )}
            
          />
          
          <Button type="submit" className="border-2 p-2 rounded-xl bg-blue-500 text-slate-800 hover:bg-blue-600 hover:text-slate-900">
            Login
          </Button>
        </form>
      </Form>
    </main>
  )
}

export default SignIn