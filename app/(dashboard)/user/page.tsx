import { MainListArea } from "@/components/MainListArea";
import { SectionCards } from "@/components/section-cards";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

async function Page() {
  const session = await auth();
  if (!session) redirect("/auth/sign-in");
   console.log("My session",session.user?.email)
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <SectionCards />
          <div className="px-4 lg:px-6">
            <MainListArea />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
