import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

function ViewMessage({ message_id }: any) {
  const [message, setMessage] = useState({
    email: "",
    recipient_id: 0,
    sender_id: 0,
    id: 0,
    content: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `/api/routers/message/get_by_id/${message_id}`
        );
        if (!res) {
          throw new Error(`HTTP error! status: ${res}`);
        } else {
          console.log(res.data);
          setMessage(res.data);
        }
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <EyeIcon className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="text-black text-lg font-medium">
          <div className="mb-2 ">Message:</div>
          <p>{message.content}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ViewMessage;
