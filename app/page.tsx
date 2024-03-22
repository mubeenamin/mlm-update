"use client";
import Image from "next/image";
import Link from "next/link";
import User from "./component/user";
import UserView from "./component/userView";
import SignIn from "./signIn/page";
import LiveTime from "./component/liveTime";
import AutoProfit from "./component/autoProfit";

export default function Home() {
  return (
    <>
      <main>
        <LiveTime />
        <SignIn />
       <AutoProfit/>
      </main>
    </>
  );
}
