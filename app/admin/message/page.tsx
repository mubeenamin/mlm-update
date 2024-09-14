"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import GetMessages from "@/app/component/getMessages";

function Page() {
  const { data: session, status } = useSession();
  // @ts-ignore
  const userdata = session?.user?.id;
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  console.log(userdata);
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
    <div>
      <GetMessages message_data={messages} />;
    </div>
  );
}

export default Page;
