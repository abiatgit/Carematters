"use client";

import { useEffect, useState } from "react";
import { Sparkles, TrendingUpIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { fetchStaff } from "@/app/(dashboard)/list/staff/action";
import { Resident, User } from "@prisma/client";
import { fetchResident } from "@/app/(dashboard)/list/resident/action";
import { useGlobalStore } from "@/store/globalStore";

// Replace with real client-safe fetch functions or API routes
async function fetchResidentsClient(resident: Resident,houseId : string | null) {
  const res = await fetchResident(resident,houseId);
  return res;
}

async function fetchStaffClient(user: User) {
  const res = await fetchStaff(user);
  console.log("staff", res);
  return res;
}

export function SectionCards() {
  const { data: session } = useSession();
  const user = session?.user;
  // const { houseId } = useGlobalStore();
  // const fakeHouseid="1d535b1e-2527-493d-a3d1-7681b0bb4a91"
    const fakeHouseid=null

  const [residents, setResidents] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    if (!user) return;
   
    async function fetchData() {
      const [residentsData, staffData] = await Promise.all([
        fetchResidentsClient(user,fakeHouseid),
        fetchStaffClient(user),
      ]);
      setResidents(residentsData || []);
      setStaff(staffData || []);
    }

    fetchData();
  }, [user]);

  const totalResidents = residents.length;
  const maleResidents = residents.filter((r) => r.gender === "male").length;
  const femaleResidents = totalResidents - maleResidents;

  const totalStaff = staff.length;
  const maleStaff = staff.filter((s) => s.gender === "male").length;
  const femaleStaff = totalStaff - maleStaff;

  return (
    <div className="@5xl/main:grid-cols-2 @7xl/main:grid-cols-4 grid grid-cols-1 gap-2 px-4 lg:px-6">
      {/* Resident Card */}
      <Card className="@container/card border border-dashed">
        <CardHeader className="flex justify-between items-start gap-1 text-sm">
          <div>
            <CardDescription>Total Residents</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {totalResidents}
            </CardTitle>
          </div>
          <div>
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {maleResidents} male
              <Separator orientation="vertical" className="mx-2 h-4" />
              {femaleResidents} female
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between items-start gap-1 text-sm">
          <div>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Total Residents
              <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              {totalResidents > 0
                ? "2 new joining the last 6 months"
                : "No recent joiners"}
            </div>
          </div>
          <div>
            <Button className="bg-green-700 hover:bg-green-600">
              <Link href={"/list/resident"}>See all</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Staff Card */}
      <Card className="@container/card border border-dashed">
        <CardHeader className="flex justify-between items-start gap-1 text-sm">
          <div>
            <CardDescription>Total Staff</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {totalStaff}
            </CardTitle>
          </div>
          <div>
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {maleStaff} male
              <Separator orientation="vertical" className="mx-2 h-4" />
              {femaleStaff} female
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between items-start gap-1 text-sm">
          <div>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Total Staff <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">6 on probation period</div>
          </div>
          <div>
            <Button className="bg-green-700 hover:bg-green-600">
              <Link href={"/list/staff"}>See all</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Active Houses */}
      <Card className="@container/card border border-dashed">
        <CardHeader className="flex justify-between items-start gap-1 text-sm">
          <div>
            <CardDescription>Active Houses</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              03
            </CardTitle>
          </div>
          <div>
            <Badge
              variant="outline"
              className="flex gap-1 rounded-lg text-xs text-violet-600"
            >
              <Sparkles /> Upgrade to pro
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between items-start gap-1 text-sm">
          <div>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Total Houses <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">You can create 7 more</div>
          </div>
          <div>
            <Button className="bg-green-700 hover:bg-green-600">
              <Link href={"/list/houses"}>Create One</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Appointments */}
      <Card className="@container/card border border-dashed">
        <CardHeader className="flex justify-between items-start gap-1 text-sm">
          <div>
            <CardDescription>Upcoming Appointments</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              7
            </CardTitle>
          </div>
          <div>
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" /> 2 in this week
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between items-start gap-1 text-sm">
          <div className="flex -space-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <Button className="bg-green-700 hover:bg-green-600">
              <Link href={"/list/appoinments"}>See All</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
