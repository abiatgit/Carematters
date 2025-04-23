"use client";
import React from "react";
import Units from "@/components/dashboard/Units";
import Stats from "@/components/dashboard/Stats";
import Appointments from "@/components/dashboard/Appointments";
import MedicationSummary from "@/components/dashboard/MedicationSummary";
import IncidentReport from "@/components/dashboard/IncidentReport";
import MessageCard from "@/components/dashboard/MessageCard";
const ManagerDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-3 space-y-4">
        <Units />
        <Stats />
        <div className="grid sm:grid-cols-4 gap-6">
          <Appointments />
          <MedicationSummary />
          <IncidentReport />
        </div>
      </div>
      <div className="md:col-span-1 space-y-4">
        <MessageCard />
      </div>
    </div>
  );
};

export default ManagerDashboard;
