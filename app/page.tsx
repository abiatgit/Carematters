"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
              Foucs what really matters
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
        <section>
  <div className="py-24">
    <div className="mx-auto max-w-5xl px-6">
      <div>
        <h2 className="text-foreground text-4xl font-semibold">Simplified Care Home Management</h2>
        <p className="text-muted-foreground mb-12 mt-4 text-balance text-lg">
          Streamline daily operations with intuitive tools designed for care staff. From resident care plans to medication tracking, our AI-assisted workflows keep your team coordinated and residents safe.
        </p>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-16 md:grid-cols-3">
        <div className="space-y-4">
          <Card className="aspect-video overflow-hidden px-6" variant="soft">
            <Card className="h-full translate-y-6" />
          </Card>
          <div className="sm:max-w-sm">
            <h3 className="text-foreground text-xl font-semibold">Resident Care Plans</h3>
            <p className="text-muted-foreground my-4 text-lg">
              Easily create, update, and share personalized care plans to ensure every resident receives the attention they need.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <Card className="aspect-video overflow-hidden p-6" variant="soft">
            <Card className="h-full" />
          </Card>
          <div className="sm:max-w-sm">
            <h3 className="text-foreground text-xl font-semibold">Medication Management</h3>
            <p className="text-muted-foreground my-4 text-lg">
              Track medication schedules and alerts to reduce errors and improve resident health outcomes.
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <Card className="aspect-video overflow-hidden" variant="soft">
            <Card className="translate-6 h-full" />
          </Card>
          <div className="sm:max-w-sm">
            <h3 className="text-foreground text-xl font-semibold">Staff Coordination</h3>
            <p className="text-muted-foreground my-4 text-lg">
              Manage shifts, assign tasks, and communicate seamlessly across your care team to maintain smooth operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        
  <section className="py-12 md:py-20">
  <div className="mx-auto max-w-5xl px-6">
    <Card className="grid gap-0.5 divide-y *:py-8 *:text-center md:grid-cols-3 md:divide-x md:divide-y-0">
      <div>
        <div className="text-foreground space-y-1 text-4xl font-bold">+150</div>
        <p className="text-muted-foreground">Care Homes Managed</p>
      </div>
      <div>
        <div className="text-foreground space-y-1 text-4xl font-bold">98%</div>
        <p className="text-muted-foreground">Resident Satisfaction Rate</p>
      </div>
      <div>
        <div className="text-foreground space-y-1 text-4xl font-bold">+1200</div>
        <p className="text-muted-foreground">Daily Tasks Completed</p>
      </div>
    </Card>
  </div>
</section>

      </div>
    </div>
  );
}
//////
// import React from 'react'
// import Link from 'next/link'
// import { Button } from '@/components/ui/button'

// import { ChevronRight, CirclePlay } from 'lucide-react'
// import Image from 'next/image'

// export default function HeroSection() {
//     return (
//         <>
        
//             <main className="overflow-hidden">
//                 <section className="bg-linear-to-b to-muted from-background">
//                     <div className="relative py-36">
//                         <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
//                             <div className="md:w-1/2">
//                                 <div>
//                                     <h1 className="max-w-md text-balance text-5xl font-medium md:text-6xl">Simple payments for startups</h1>
//                                     <p className="text-muted-foreground my-8 max-w-2xl text-balance text-xl">One tool that does it all. Search, generate, analyze, and chat—right inside Tailark.</p>

//                                     <div className="flex items-center gap-3">
//                                         <Button
//                                             asChild
//                                             size="lg"
//                                             className="pr-4.5">
//                                             <Link href="#link">
//                                                 <span className="text-nowrap">Get Started</span>
//                                                 <ChevronRight className="opacity-50" />
//                                             </Link>
//                                         </Button>
//                                         <Button
//                                             key={2}
//                                             asChild
//                                             size="lg"
//                                             variant="outline"
//                                             className="pl-5">
//                                             <Link href="#link">
//                                                 <CirclePlay className="fill-primary/25 stroke-primary" />
//                                                 <span className="text-nowrap">Watch video</span>
//                                             </Link>
//                                         </Button>
//                                     </div>
//                                 </div>

//                                 <div className="mt-10">
//                                     <p className="text-muted-foreground">Trusted by teams at :</p>
//                                     <div className="mt-6 grid max-w-sm grid-cols-3 gap-6">
//                                         <div className="flex">
//                                             <img
//                                                 className="h-4 w-fit"
//                                                 src="https://html.tailus.io/blocks/customers/column.svg"
//                                                 alt="Column Logo"
//                                                 height="16"
//                                                 width="auto"
//                                             />
//                                         </div>
//                                         <div className="flex">
//                                             <img
//                                                 className="h-5 w-fit"
//                                                 src="https://html.tailus.io/blocks/customers/nvidia.svg"
//                                                 alt="Nvidia Logo"
//                                                 height="20"
//                                                 width="auto"
//                                             />
//                                         </div>
//                                         <div className="flex">
//                                             <img
//                                                 className="h-4 w-fit"
//                                                 src="https://html.tailus.io/blocks/customers/github.svg"
//                                                 alt="GitHub Logo"
//                                                 height="16"
//                                                 width="auto"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="perspective-near mt-24 translate-x-12 md:absolute md:-right-6 md:bottom-16 md:left-1/2 md:top-40 md:mt-0 md:translate-x-0">
//                             <div className="before:border-foreground/5 before:bg-foreground/5 relative h-full before:absolute before:-inset-x-4 before:bottom-7 before:top-0 before:skew-x-6 before:rounded-[calc(var(--radius)+1rem)] before:border">
//                                 <div className="bg-background rounded-(--radius) shadow-foreground/10 ring-foreground/5 relative h-full -translate-y-12 skew-x-6 overflow-hidden border border-transparent shadow-md ring-1">
//                                     <Image
//                                         src="/mist/tailark.png"
//                                         alt="app screen"
//                                         width="2880"
//                                         height="1842"
//                                         className="object-top-left size-full object-cover"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </main>
//         </>
//     )
// }