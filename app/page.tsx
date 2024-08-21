"use client";

import SignIn from "./signIn/page";
import LiveTime from "./component/liveTime";

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
