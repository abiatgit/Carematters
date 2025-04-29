"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import IncidentTable from "./incident-report/IncidentTable";
import { incidentData } from "./incident-report/data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import AppoinmentCards from "./appoinmentsCard/AppoinmentCards";
import { appointments } from "./appoinmentsCard/data";

export function MainListArea() {
  return (
    <div className=" @xl/main:grid-cols-1 @5xl/main:grid-cols-2 grid grid-cols-1 gap-2   ">
      <Card className="@container/card h-[500px] border border-dashed ">
        <CardHeader className="relative ">
          <CardTitle>Incident Reoports</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6 ">
          <IncidentTable data={incidentData}></IncidentTable>
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
      <Card className="@container/card h-[500px] border border-dashed">
        <CardHeader className="relative">
          <CardTitle>Apponinments</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6 overflow-y-auto">
          <AppoinmentCards data={appointments}/>
        </CardContent>
      </Card>
    </div>
  );
}
