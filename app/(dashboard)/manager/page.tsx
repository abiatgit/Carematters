import { ChartAreaInteractive } from "@/components/chart-intractive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import data from "./data.json"
import React from "react";

function Page() {
  return (
    <div>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
    </div>
  );
}

export default Page;

// "use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Separator } from "@/components/ui/separator";
// import { Badge, TrendingUpIcon } from "lucide-react";

// export default function Layout() {
//   return (
//     <div className="p-4 h-screen">
//       <div className="grid md:grid-cols-4 sm:grid-rows-[auto_1fr] gap-4 h-full">
//         {/* Top row - 3 equal boxes */}
//         <Card className="col-span-1 h-[150px] flex flex-col justify-between min-w-0 overflow-hidden">
//         <CardHeader>
//       <div className="flex">
//       <CardTitle>50</CardTitle>
//         <Separator
//           orientation="vertical"
//           className="mx-2 data-[orientation=vertical]:h-4"
//         />
//       </div>
//         <CardDescription>Deploy your new project in one-click.</CardDescription>
//       </CardHeader>
//         </Card>
//         <Card className="col-span-1  rounded-lg h-[150]"></Card>
//         <Card className="col-span-1  rounded-lg h-[150]">
//           <CardContent></CardContent>
//         </Card>
//         <Card className="col-span-1 md:row-span-2  rounded-lg h-[600]" />{" "}
//         {/* Tall right box */}
//         {/* Bottom row - wide box */}
//         <Card className="md:col-span-3  rounded-lg h-[600]" />
//       </div>
//     </div>
//   );
// }
