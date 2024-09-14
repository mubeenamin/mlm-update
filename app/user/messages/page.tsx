"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import GetMessages from "@/app/component/getMessages";
import NewMessages from "@/app/component/newMessages";

function Page() {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  const { data: session, status } = useSession();
  // @ts-ignore
  const userdata = session?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `/api/routers/message/get_messages/${userdata}`
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setMessages(data);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [userdata]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main>
      <div className="flex justify-end mb-4">
        <NewMessages />
      </div>
      <GetMessages message_data={messages} />
    </main>
  );
}

export default Page;
