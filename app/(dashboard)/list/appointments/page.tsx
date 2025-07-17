"use client"
import React, { useState } from "react";
import { DataTable } from "./data-table";
import { createColumns } from "./columns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AppointmentForm from "@/components/forms/appointment/appointmentForm";
import { fetchAppointmentsByUnit } from "./action";
import { useGlobalStore } from "@/store/globalStore";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AppointmentSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Page() {
  const [open, setOpen] = useState(false);
  const { houseId, careHome, user } = useGlobalStore();
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments', houseId],
    queryFn: () => fetchAppointmentsByUnit(houseId, 100, careHome?.id),
    enabled: !!houseId,
  });

  const refreshAppointments = () => {
    queryClient.invalidateQueries({ queryKey: ['appointments', houseId] });
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">All Appointments - Selected House</h1>
        <div>
          {(user?.role === "MANAGER" || user?.role === "TEAM_LEAD") && (
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant={"outline"} className="border-green-700">
                  New Appointment
                </Button>
              </DialogTrigger>
              <AppointmentForm setOpen={setOpen} onSuccess={refreshAppointments} />
            </Dialog>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        {isLoading ? (
          <AppointmentSkeleton />
        ) : appointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No appointments found for the selected house.</p>
          </div>
        ) : (
          <DataTable 
            data={appointments} 
            columns={createColumns(refreshAppointments)} 
          />
        )}
      </div>
    </div>
  );
}
