"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import AppoinmentCards from "@/components/appoinmentsCard/AppoinmentCards";
import { Progress } from "@/components/ui/progress";
import MedsTable from "@/components/medsTable/MedsTable";

const appointments = [
  {
    id: "1a1a1a1a-aaaa-1111-aaaa-111111111111",
    where: "Royal Victoria Hospital",
    date: new Date("2025-05-01T10:00:00Z"),
    time: new Date("2025-05-01T10:30:00Z"),
    with: "Dr. Susan Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    residentId: "Clara Mcd",
    unitId: "Comgal",
  },
  {
    id: "1a1a1a1a-aaaa-1111-aaaa-111111111111",
    where: "Royal Victoria Hospital",
    date: new Date("2025-05-01T10:00:00Z"),
    time: new Date("2025-05-01T10:30:00Z"),
    with: "Dr. Susan Smith",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    residentId: "Clara Mcd",
    unitId: "Comgal",
  },
];
const SingelResidentPage = () => {
  const date=new Date().toLocaleDateString()
  const [progress, setProgress] = useState(10);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(50), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/manager">Dashboard</BreadcrumbLink>
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
          <div className="border border-dashed p-4 rounded-l-lg">
            <h1 className="text-xl font-semibold">User Info</h1>
          </div>
          {/*User info*/}
          <div className="border border-dashed p-4 rounded-l-lg">
            <div >
              <p className="my-7">Meds for <span>{date}</span></p>
              <Progress value={progress} />
              <MedsTable/>
            </div>
            <div className="mt-5">
       
            </div>
          </div>
          {/*User info*/}
          <div className="border border-dashed p-4 rounded-l-lg">
            <h1 className="my-4">Appoinments</h1>
            <AppoinmentCards data={appointments}></AppoinmentCards>
          </div>
        </div>
        {/* Left*/}
        <div className="w-full xl:w-2/3 space-y-6">
          {/*User Card*/}
          <div className="border border-dashed p-4 rounded-l-lg">graph</div>
          {/*Chart container*/}
          <div className="border border-dashed p-4 rounded-l-lg">
            incidents
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingelResidentPage;
