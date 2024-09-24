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

const FormSchema = z.object({
  sender_id: z.number(),
  recipient_id: z.number(),
  email: z.string(),
  content: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
  // name: z.string(),
});

function NewMessages() {
  const { data: session } = useSession();
  // @ts-ignore
  const senderId: number = session?.user?.id;
  // @ts-ignore
  const sender_email: string = session?.user?.email;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
      email: sender_email,
      sender_id: senderId,
      recipient_id: 0,
      // name: "string",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await axios.post(
        "/api/routers/message/send_message_by_user",
        data
      );
      if (!res) {
        throw new Error(`HTTP error! status:`);
      } else {
        toast("Message sent successfully", { type: "success" });
        form.reset();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-mlmSkyLight text-white">New Message</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Message"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="text-red-500">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default NewMessages;
