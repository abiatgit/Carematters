"use client";
import React, { use, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import AppoinmentCards from "@/components/appoinmentsCard/AppoinmentCards";
import { Progress } from "@/components/ui/progress";
import MedsTable from "@/components/medsTable/MedsTable";
import { Button } from "@/components/ui/button";
import { Folder, Pencil, Plus } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Dialog } from "@/components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { CreateIncidentFrom } from "@/components/forms/incidentreport/CreateIncident";
import { IncidetnChart } from "@/components/incidentChart/incidentChart";
import { fetchResidentwithId } from "../action";
import { Resident } from "@prisma/client";


// const appointments = [
//   {
//     id: "1a1a1a1a-aaaa-1111-aaaa-111111111111",
//     where: "Royal Victoria Hospital",
//     date: new Date("2025-05-01T10:00:00Z"),
//     time: new Date("2025-05-01T10:30:00Z"),
//     with: "Dr. Susan Smith",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     residentId: "Clara Mcd",
//     unitId: "Comgal",
//   },
//   {
//     id: "1a1a1a1a-aaaa-1111-aaaa-111111111111",
//     where: "Royal Victoria Hospital",
//     date: new Date("2025-05-01T10:00:00Z"),
//     time: new Date("2025-05-01T10:30:00Z"),
//     with: "Dr. Susan Smith",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     residentId: "Clara Mcd",
//     unitId: "Comgal",
//   },
// ];
const SingelResidentPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params)
  const getResident = async (residentId: string) => {
    const res = await fetchResidentwithId(residentId)
    setUser(res)
  }
  const [user, setUser] = useState<Resident | null>(null)
  const date = new Date().toLocaleDateString();
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    getResident(id)
  }, [id])
console.log("user",user)
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/user">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/list/resident/">Resident</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>id</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className=" mt-4 flex flex-col xl:flex-row gap-8">
        {/* Left*/}
        <div className="w-full xl:w-1/3 space-y-6">
          {/*User badges*/}
          <div className="border border-dashed p-4 rounded-l-lg flex-row space-y-2 ">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Name : {"Mr.John Doe"}</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"outline"} size={"icon"}>
                    <Pencil></Pencil>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>

            <p className="text-foreground text-sm">
              Date of Birth : {"13/03/1965"}
            </p>
            <p className="text-foreground text-sm">Room Number : {"403"}</p>
            <p className="text-foreground text-sm">GP : {"Dr.Kenedy"}</p>
            <p className="text-foreground text-sm">Family : {"Dr.Kenedy"}</p>
            <p className="text-foreground text-sm">Contact : {"07741068115"}</p>
            <p className="text-foreground text-sm">
              Bio:{" "}
              {
                " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum vel, provident omnis alias corrupti expedita consectetur accusantium, quasi aliquid veritatis quia !"
              }
            </p>
          </div>
          {/*User info*/}
          <div className="border border-dashed p-4 rounded-l-lg">
            <div>
              <p className="my-7">
                {/* Meds for <span>{date}</span> */}
              </p>
              <Progress value={progress} />
              <MedsTable />
            </div>
            <div className="mt-5"></div>
          </div>
          {/*User info*/}
          <div className="border border-dashed p-4 rounded-l-lg">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold">Up Comming Appoinments</h1>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant={"outline"} size={"icon"}>
                    <Plus></Plus>
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Are you absolutely sure?</SheetTitle>
                    <SheetDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
            {/* <AppoinmentCards data={appointments}></AppoinmentCards> */}
          </div>
        </div>
        {/* Left*/}
        <div className="w-full xl:w-2/3 space-y-6">
          {/*User Card*/}
          <div className="border border-dashed flex gap-4 p-4 rounded-l-lg">
            <Button>Daily Reoprt</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Incidet Reoprt</Button>
              </DialogTrigger>
              <CreateIncidentFrom user={user} />
            </Dialog>

            <Button>Food & Fluid</Button>
            <Button>Body Map</Button>
            <Button>
              Care Plan <Folder />
            </Button>
          </div>
          {/*Chart container*/}
          <div className="border border-dashed p-4 rounded-l-lg">
            <IncidetnChart></IncidetnChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingelResidentPage;
