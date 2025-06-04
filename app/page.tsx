"use client";
console.log("Loaded auth.ts");
import { Button } from "@/components/ui/button";

import { MoveRight, Rabbit } from "lucide-react";
import Link from "next/link";
export default function Home() {
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="text-2xl">
            <Link
              href="/"
              className="flex items-center gap-2 self-center font-medium"
            >
              <div>
                <Rabbit className="text-green-700"></Rabbit>
              </div>
              Care Matters
            </Link>
          </div>
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              This is the start of something new
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
      </div>
    </div>
  );
}
