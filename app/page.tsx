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
          <Card className="aspect-video overflow-hidden px-6">
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
          <Card className="aspect-video overflow-hidden p-6" >
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
          <Card className="aspect-video overflow-hidden">
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
