"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
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

const onSubmit = (data: z.infer<typeof FormSchema>) => {
  console.log(data)
};

function CreatePin() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      create_pin: "",
      confirm_pin: "",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create pin</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="text-white">
          <DialogTitle>Create pin</DialogTitle>
          <DialogDescription>
            Create your account pin
          </DialogDescription>
        </DialogHeader>
        <Form {...form} >
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 text-white"
          >
            <FormField
              control={form.control}
              name="create_pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Create pin</FormLabel>
                  <FormControl>
                    <Input placeholder="Create pin" {...field} />
                  </FormControl>
                  <FormDescription>
                    Create your account pin
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm pin</FormLabel>
                  <FormControl>
                    <Input placeholder="Confirm pin" {...field} />
                  </FormControl>
                  <FormDescription>
                    Confirm your account pin
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <DialogClose asChild>
          <Button className="text-white" variant="ghost">Close</Button>
        </DialogClose>  
      </DialogContent>
    </Dialog>
  );
}

export default CreatePin;
