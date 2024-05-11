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
  create_pin: z.string().min(4, {
    message: "Create pin must be at least 4 characters.",
  }),
  confirm_pin: z.string().min(4, {
    message: "Confirm pin must be at least 4 characters.",
  }),
});

// const onSubmit = (data: z.infer<typeof FormSchema>) => {
//   console.log(data);

// };

function CreatePin() {


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      create_pin: "",
      confirm_pin: "",
    },
  });

  const handleReset = () => {
    form.reset({
      create_pin: "",
      confirm_pin: "",
    })
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
   
    try {
      const res = await fetch("/api/create_pin", {
        method: "POST",        
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pin_id : data.create_pin
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
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Form {...form} >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 p-5"
        >
          <h1 className="text-2xl font-bold ">Create Pin</h1>
          <div className="w-70 space-y-4 gap-4">
          <FormField
          
                control={form.control}
                name="create_pin"
                render={({ field }) => (
                  <FormItem className="gap-4">
                   
                    <FormControl>
                      <Input placeholder="Enter your Pin" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="confirm_pin"
                render={({ field }) => (
                  <FormItem className="gap-4">
                   
                    <FormControl>
                      <Input placeholder="Confirm your Pin" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
          </div>
          <div>
          <Button type="submit" className="bg-red-500/70">
                  Submit
                </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}

export default CreatePin;
