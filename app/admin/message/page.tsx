"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import GetMessages from "@/app/component/getMessages";

function Page() {
  const { data: session, status } = useSession();
  // @ts-ignore
  const userdata = session?.user?.id;
  const [messages, setMessages] = useState([]);

  let messagesData: any;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/routers/message/get_messages/${userdata}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        } else {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {}
    };

    fetchData();
  }, [userdata]);

  if (messages === null) {
    return <div>No messages found</div>;
  } else {
    messagesData = messages;
  }

  return (
    <div>
      <GetMessages message_data={messagesData} />
    </div>
  );
}

export default Page;
