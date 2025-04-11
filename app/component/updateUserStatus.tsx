"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdEdit } from "react-icons/md";

const FormSchema = z.object({
  status: z.string(),
});

function UpdateUserStatus({ user_id }: any) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const res = await axios.put(
        `/api/routers/user/update_user_by_id/${user_id}`,
        data
      );
      if (!res) {
        throw new Error(`HTTP error! status:`);
      } else {
        toast("Status update successfully", { type: "success" });
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
          <MdEdit size={26} className="text-red-500" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="gap-4">
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Deactive" className="text-green-600">
                        Deactive
                      </SelectItem>
                    </SelectContent>
                  </Select>
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

export default UpdateUserStatus;
