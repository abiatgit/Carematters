"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import IncidentTable, { IncidetProp } from "./incident-report/IncidentTable";
import { fetchIncidents } from "./incident-report/data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Appoinment, Role } from "@prisma/client";
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/store/globalStore";
import { fetchAppoinment } from "@/app/(dashboard)/list/appoinments/action";
import AppoinmentCards from "./appoinmentsCard/AppoinmentCards";
import { SkeletonDemo } from "./skelton";

const ITEMS_PER_PAGE = 6;
export type SafeUser = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
};

export function MainListArea() {

  const [appointments, setAppointments] = useState<Appoinment[]>([])
  const [incidentData, setInsidnetData] = useState<IncidetProp[]>([])
  const { houseId } = useGlobalStore()
  async function fetchAppoinmentClient(houseId: string | null) {
    const res = await fetchAppoinment(houseId);
    setAppointments(res!)
    return res;
  }
  const IncidentDataFetch = async (houseId: string | null) => {
    if (!houseId) return []
    const data = await fetchIncidents(houseId)
    setInsidnetData(data || [])
  }
  useEffect(() => {
    if (!houseId) return;
    fetchAppoinmentClient(houseId)
    IncidentDataFetch(houseId)
  }, [houseId])

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
          {paginatedData.length == 0 ? <div className="flex flex-col gap-5"><SkeletonDemo /><SkeletonDemo /><SkeletonDemo /></div> :
            <IncidentTable data={paginatedData} />}
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
          <AppoinmentCards
            data={appointments.map((appt) => ({
              ...appt,
              residentName: "", // Provide actual resident name if available
              residentAvatar: "", // Provide actual avatar URL if available
              unitName: "", // Provide actual unit name if available
            }))}
          />
        </CardContent>
      </Card>
    </div>
  );
}
