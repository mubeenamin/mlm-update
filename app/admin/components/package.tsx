"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
const formSchema = z.object({
  packagename: z.string().min(2, {
    message: "Package name must be at least 2 characters.",
  }),
});
function Packages() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      packagename: "",
    },
  });
  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }
  return (
    <main className="space-y-4">
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-max-full gap-8"
          >
            <div className="w-80 h-24">
              <FormField
                control={form.control}
                name="packagename"
                render={({ field }) => (
                  <FormItem className="gap-4">
                    <FormLabel>Package Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Package Name" {...field} />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center">
              <div>
                <Button type="submit" className="bg-red-500/70">
                  Submit
                </Button>
              </div>
            </div>
          </form>
          <FormItem></FormItem>
        </Form>
      </div>
      <div>
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody></TableBody>
        </Table>
      </div>
    </main>
  );
}

export default Packages;
