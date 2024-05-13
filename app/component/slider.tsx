"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image"

export function CarouselDemo() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
       <Image src="/logo.jpeg" alt="logo" width={32} height={32} className="rounded-full h-full w-full"/>
       <Image src="/logo.jpeg" alt="logo" width={32} height={32} className="rounded-full h-full w-full"/>
       <Image src="/logo.jpeg" alt="logo" width={32} height={32} className="rounded-full h-full w-full"/>
       <Image src="/logo.jpeg" alt="logo" width={32} height={32} className="rounded-full h-full w-full"/>
       <Image src="/logo.jpeg" alt="logo" width={32} height={32} className="rounded-full h-full w-full"/>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
