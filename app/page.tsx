"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoveRight, Rabbit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div className="w-full">
      <div className="bg-gray-100 h-13 flex items-center px-9 justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 self-center font-medium"
        >
          <div>
            <Rabbit className="text-green-700"></Rabbit>
          </div>
          Care Matters
        </Link>
        <div>
          <Button variant={"link"} asChild>
            <a href={"#about"}> About</a>
          </Button>
          <Button variant={"link"}>
            {" "}
            <Link href={"#features"}>Features</Link>
          </Button>
          <Button variant={"link"}>
            <Link href={"#support"}> Support</Link>
          </Button>
          <Badge className="border-green-700 p-1.5 bg-green-700 text-white w-21 " variant={"outline"}>
           <Link href={"/auth/sign-up"}> Demo</Link>
          </Badge>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex gap-8 py-10 lg:py-40 items-center justify-center flex-col">
          <div className="text-2xl">
            
            <Badge className="p-2" variant={"outline"}>
                {/* <Badge variant="outline" className=" border-green-700">AI</Badge> */}
              foucs what really matters
            </Badge>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              You care for others.<br></br>  We care your<span className="text-green-700">  workflow.</span>
            </h1>
            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Running a care home is already challenging. Don’t let outdated
              systems slow you down. CareMatters simplifies care management,
              empowering teams to deliver better care with less hassle. From
              staff coordination to resident tracking — everything you need, all
              in one place.
            </p>
          </div>
          <div className="flex flex-row gap-3">
            <Link href={"/auth/sign-in"}>
              <Button size="lg" className="gap-4" variant="outline">
                Sign In
              </Button>
            </Link>
            <Link href={"/auth/sign-up"}>
              <Button size="lg" className="gap-4 bg-green-700">
                Sign up <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full h-full  rounded-md p-5 flex items-center justify-center">
          <Image src="/cm.png" alt="" width={1200} height={100} />
        </div>
        <section id="about">About</section>
        <section id="features">Features</section>
        <section id="support">Support</section>
      </div>
    </div>
  );
}
