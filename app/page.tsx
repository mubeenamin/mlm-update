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
  <Image
    src={"/home.jpg"}
    width={800}
    height={800}
    alt="Background Image"
    className="absolute inset-0 w-full h-full object-cover filter "
  />
  <div className="absolute inset-0 bg-black bg-opacity-50" />
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <h1 className="text-4xl text-white font-bold">Hello, Everyone</h1>
    <p className=" flex text-xl text-white mt-4">Well come to   <Image src={"/logos.png"} width={150} height={150} alt="logo" className=" pl-2" /></p>
    <p className="mt-4 text-white text-xl text-justify px-8 w-2/3 ">
        Join over 200+ brands advertising on TV with Opus Globals
Our clients come from all stages; from TV novices to experienced advertisers, and different industries. No matter the stage or size of budget - our technology and service put your goals first.
        </p>
  </div>
</div>

        </div>
      </main>
    </>
  );
}
