import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { IoMdSend } from "react-icons/io"

export function SendMsg() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">
        <IoMdSend size={24} className="text-mlmSky" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
      Send Message
    </h2>
          </SheetTitle>
          
        </SheetHeader>
       
       
        <form className="space-y-8">
    
    <div>
      <label
        htmlFor="subject"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        User Email 
      </label>
      <div>
        demo@gmail.com
      </div>
    </div>
    <div className="sm:col-span-2">
      <label
        htmlFor="message"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
      >
        Your message
      </label>
      <textarea
        
        rows={6}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder="Leave a comment..."
        defaultValue={""}
      />
    </div>
    <button
      type="submit"
      
      className="py-3 px-5 bg-mlmSky hover:bg-mlmSkyLight text-sm font-medium text-center text-black rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 "
    >
      Send message
    </button>
  </form>
      </SheetContent>
    </Sheet>
  )
}
