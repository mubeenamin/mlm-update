"use client";
import Image from "next/image";
import Link from "next/link";
import User from "./component/user";
import UserView from "./component/userView";
import SignIn from "./signIn/page";
import LiveTime from "./component/liveTime";
import AutoProfit from "./component/autoProfit";
import { signOut, useSession } from "next-auth/react";
export default function Home() {
  const { data: session, status } = useSession();

  if (session) {
    signOut();
  }

  return (
    <>
      <main>
        <LiveTime />
      </main>
    </>
  );
}
