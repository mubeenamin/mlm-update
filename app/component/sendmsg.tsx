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
import { toast, ToastContainer } from "react-toastify";

const FormSchema = z.object({
  sender_id: z.number(),
  recipient_id: z.number(),
  email: z.string(),
  content: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
  // name: z.string(),
});

export default function SendMsg(message_id: any) {
  const { data: session } = useSession();
  // @ts-ignore
  const senderId = session?.user?.id;
  // @ts-ignore
  const sender_email: string = session?.user?.email;
  const recipientId = message_id.message_id;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      content: "",
      email: sender_email,
      sender_id: senderId,
      recipient_id: recipientId,
      // name: "string",
    },
  });

  const onSubmit = async (submit_data: z.infer<typeof FormSchema>) => {
    try {
      const res = await axios.post(
        "/api/routers/message/send_message",
        submit_data
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
        <Button>
          <IoMdSend size={24} className="text-mlmSky" />
        </Button>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
