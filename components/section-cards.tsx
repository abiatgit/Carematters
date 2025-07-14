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
import { fetchStaff } from "@/app/(dashboard)/list/staff/action";
import { Resident, User } from "@prisma/client";
import { fetchResident } from "@/app/(dashboard)/list/resident/action";
import { useGlobalStore } from "@/store/globalStore";
import { fetchUpcomingAppointmentsByUnit, EnrichedAppointment } from "@/app/(dashboard)/list/appoinments/action";

type MinimalCareHome = {
  id: string;
  name?: string;
} | null;
async function fetchResidentsClient(houseId: string | null) {
  const res = await fetchResident(houseId);
  return res;
}
async function fetchStaffClient(houseId: string | null) {
  const res = await fetchStaff(houseId);
  return res;
}
async function fetchUpcomingAppointmentsClient(houseId: string | null) {
  const res = await fetchUpcomingAppointmentsByUnit(houseId);
  return res;
}
export function SectionCards() {
  const { user } = useGlobalStore()
  const { houseId } = useGlobalStore();
  const [residents, setResidents] = useState<Resident[]>([]);
  const [staff, setStaff] = useState<User[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<EnrichedAppointment[]>([])
  const [allhouses, setAllhouses] = useState<MinimalCareHome[]>([]);
  const { careHome } = useGlobalStore()

  const totalResidents = residents.length;
  const maleResidents = residents.filter((r) => r.gender === "male").length;
  const femaleResidents = totalResidents - maleResidents;
  const totalStaff = staff.length;
  const maleStaff = staff.filter((s) => s.gender === "male").length;
  const femaleStaff = totalStaff - maleStaff;

  async function fetchAllHouse(careHome: MinimalCareHome) {
    if (!careHome || !careHome.id) return;
    try {
      const res = await fetch(`/api/houses?careHomeId=${encodeURIComponent(careHome.id)}`, {
        method: "GET",
      });
      const data = await res.json();
      setAllhouses(data.houses)
    } catch (error) {
      console.error("Failed to fetch houses:", error);
    }
  }

  useEffect(() => {
    if (!user || !houseId) return;
    async function fetchData() {
      const [residentsData, staffData, appointmentData] = await Promise.all([
        fetchResidentsClient(houseId),
        fetchStaffClient(houseId),
        fetchUpcomingAppointmentsClient(houseId)
      ]);
      setResidents(residentsData || []);
      setStaff(staffData || []);
      setUpcomingAppointments(appointmentData || [])
    }
    fetchData();
    fetchAllHouse(careHome)
  }, [user, houseId, careHome]);

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
          <div >
            <Link href={"/list/resident"}>
              <Button className="bg-green-700 hover:bg-green-600">
                See all
              </Button>
            </Link>
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
      {/* Appointments */}
      <Card className="@container/card border border-dashed">
        <CardHeader className="flex justify-between items-start gap-1 text-sm">
          <div>
            <CardDescription>Upcoming Appointments (Next 10 Days)</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {upcomingAppointments.length}
            </CardTitle>
          </div>
          <div>
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" /> 
              {upcomingAppointments.filter(apt => {
                const appointmentDate = new Date(apt.date);
                const today = new Date();
                const oneWeekFromNow = new Date();
                oneWeekFromNow.setDate(today.getDate() + 7);
                return appointmentDate >= today && appointmentDate <= oneWeekFromNow;
              }).length} this week
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between items-start gap-1 text-sm">
          <div className="flex -space-x-3">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.slice(0, 3).map((appointment) => (
                <Avatar key={appointment.id} className="border-2 border-white">
                  <AvatarImage 
                    src={appointment.residentAvatar || undefined} 
                    alt={appointment.residentName || "Resident"} 
                  />
                  <AvatarFallback>
                    {appointment.residentName?.split(' ').map(n => n[0]).join('') || 'R'}
                  </AvatarFallback>
                </Avatar>
              ))
            ) : (
              <div className="text-muted-foreground text-xs">No upcoming appointments</div>
            )}
            {upcomingAppointments.length > 3 && (
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-xs font-medium">
                +{upcomingAppointments.length - 3}
              </div>
            )}
          </div>
          <div>
            <Button className="bg-green-700 hover:bg-green-600">
              <Link href={"/list/appoinments"}>See All</Link>
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
              {allhouses.length}
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
              <Link href={"/list/houses"}>Add New</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}


