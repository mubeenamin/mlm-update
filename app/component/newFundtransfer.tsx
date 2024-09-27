
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const newFundtransfer = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-mlmSkyLight text-white">New Message</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form >
          <form  className=" space-y-6">
            <FormField
              
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
  )
}

export default newFundtransfer