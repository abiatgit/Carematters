import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const MedicationSummary = () => {
  return (
    <Card className="sm:col-span-2 transition hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">💊 Medication Updates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm text-muted-foreground">
        <div className="flex justify-between items-center">
          <span>Resident B - Paracetamol</span>
          <span className="text-xs text-gray-500">+500mg</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Resident C - Insulin</span>
          <span className="text-xs text-gray-500">Updated Dosage</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Resident D - Vitamin D</span>
          <span className="text-xs text-gray-500">Discontinued</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicationSummary;
