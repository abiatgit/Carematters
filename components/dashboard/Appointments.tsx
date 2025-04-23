import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const Appointments = () => {
  return (
    <Card className="sm:col-span-2 transition hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          🗓️ Visits & Appointments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <div className="flex justify-between items-center">
          <span>Dr. Smith - Room 102</span>
          <span className="text-xs text-gray-500">Today, 3:00 PM</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Family Visit - John D.</span>
          <span className="text-xs text-gray-500">Tomorrow, 11:00 AM</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Eye Checkup - Resident A</span>
          <span className="text-xs text-gray-500">Fri, 10:30 AM</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Appointments;
