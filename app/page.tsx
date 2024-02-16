"use client";
import Image from "next/image";
import Link from "next/link";
import User from "./component/user";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <User/>
    </main>
  );
}
