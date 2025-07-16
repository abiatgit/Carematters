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
import { Role } from "@prisma/client";
import { useEffect, useState } from "react";
import { useGlobalStore } from "@/store/globalStore";
import AppoinmentCards from "./appoinmentsCard/AppoinmentCards";
import { SkeletonDemo } from "./skelton";
import { FileText } from "lucide-react";

const ITEMS_PER_PAGE = 6;
export type SafeUser = {
  id: string;
  name: string | null;
  email: string;
  role: Role;
};




export function MainListArea() {

  const [incidentData, setInsidnetData] = useState<IncidetProp[]>([])
  const [loading, setLoading] = useState(false)
  const { houseId, careHome } = useGlobalStore()
  const IncidentDataFetch = async (houseId: string | null) => {
    if (!houseId) return []
    setLoading(true)
    const data = await fetchIncidents(houseId, careHome?.id)
    setInsidnetData(data || [])
    setLoading(false)
  }
  useEffect(() => {
    if (!houseId) return;
    IncidentDataFetch(houseId)
  }, [houseId, careHome])

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
<Card className="@container/card h-[500px] flex flex-col justify-between border border-dashed">

        <CardHeader>
          <CardTitle>Incident Reports</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-6 overflow-y-auto flex-1">

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <SkeletonDemo key={i} />
              ))}
            </div>
          ) : incidentData.length == 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="text-gray-400 mb-2">
                <FileText size={48} />
              </div>
              <p className="text-lg font-medium text-gray-600">No incidents found</p>
              <p className="text-sm text-gray-400">There are no incident reports for this unit.</p>
            </div>
          ) : (
            <IncidentTable data={paginatedData} />
          )}
        </CardContent>
        <CardFooter className="-mb-0">
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
          <AppoinmentCards />
        </CardContent>
      </Card>
    </div>
  );
}
