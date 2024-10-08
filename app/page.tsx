"use client";

import SignIn from "./signIn/page";
import LiveTime from "./component/liveTime";

import { signOut, useSession } from "next-auth/react";
import HomeNav from "./component/homeNav";
import Image from "next/image";
export default function Home() {
  const { data: session, status } = useSession();

  if (session) {
    signOut();
  }

  return (
    <>
      <main className="">
        <LiveTime />
        <div >
         <HomeNav />
        </div>
        <div>
        <div className="relative bg-mlmSky  h-screen w-full">
  {/* <Image
    src={"/bg.jpeg"}
    width={1920}
    height={1080}
    alt="Background Image"
    className="absolute inset-0 w-full h-full object-cover filter blur-sm"
  /> */}
  <div className="absolute inset-0 bg-black bg-opacity-50" />
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <h1 className="text-4xl text-white font-bold">Hello, Everyone</h1>
    <p className="text-xl text-white mt-4">Well come to OPUS GLOBALS</p>
  </div>
</div>

        </div>
      </main>
    </>
  );
}
