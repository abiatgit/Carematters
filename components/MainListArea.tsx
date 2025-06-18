"use client";
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
import { Role } from "@prisma/client";
import { useState } from "react";

const ITEMS_PER_PAGE = 6;
export type SafeUser = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
};

export function MainListArea() {

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(incidentData.length / ITEMS_PER_PAGE);
  const paginatedData = incidentData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="@xl/main:grid-cols-1 @5xl/main:grid-cols-2 grid grid-cols-1 gap-2">
      <Card className="@container/card h-[500px] border border-dashed">
        <CardHeader>
          <CardTitle>Incident Reports</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6 overflow-hidden">
          <IncidentTable data={paginatedData} />
        </CardContent>
        <CardFooter>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage - 1);
                  }}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === index + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(index + 1);
                    }}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(currentPage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>

      <Card className="@container/card h-[500px] border border-dashed">
        <CardHeader>
          <CardTitle>Appointments</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6 overflow-y-auto">
          <AppoinmentCards data={appointments} />
        </CardContent>
      </Card>
    </div>
  );
}
