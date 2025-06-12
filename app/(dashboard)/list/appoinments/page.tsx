import React from "react";
import { appointments } from "@/lib/mockData";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AppointmentForm from "@/components/forms/appointment/appointmentForm";
const getData = () => {
  return appointments;
};
export default function Page() {
  const data = getData();
  return (
    <div>
      <div className="flex justify-between">
        Appoinments
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="border-green-700">
                New Appoinment
              </Button>
            </DialogTrigger>
            
            <AppointmentForm />
          </Dialog>
        </div>
      </div>
      <DataTable data={data} columns={columns}></DataTable>
    </div>
  );
}
