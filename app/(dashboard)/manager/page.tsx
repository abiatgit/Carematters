import { MainListArea } from "@/components/MainListArea";
import { SectionCards } from "@/components/section-cards";
import React from "react";

function Page() {
  return (
    <div>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
               <MainListArea/>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Page;

