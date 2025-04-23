"use client";
import React from "react";
import MedicationSummary from "@/components/dashboard/MedicationSummary";
import Appointments from "@/components/dashboard/Appointments";
import IncidentReport from "@/components/dashboard/IncidentReport";
import MessageCard from "@/components/dashboard/MessageCard";

const NurseDashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
      {/* Main Content */}
      <div className="md:col-span-3 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MedicationSummary />
          <Appointments />
          <IncidentReport />
        </div>
      </div>
      
      {/* Sidebar */}
      <div className="md:col-span-1 space-y-6">
        <MessageCard />
      </div>
    </div>
  );
};

export default NurseDashboard;
