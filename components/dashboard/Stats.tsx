import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const Stats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      {/* Staff-to-Resident Ratio */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Staff-to-Resident Ratio
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-blue-600">1:5</p>
          <p className="text-xs text-gray-400 mt-1">Target: 1:4</p>
        </CardContent>
      </Card>

      {/* Room Occupancy */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Room Occupancy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-green-600">85%</p>
          <p className="text-xs text-gray-400 mt-1">20 of 24 rooms occupied</p>
        </CardContent>
      </Card>

      {/* Medication Compliance */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm text-muted-foreground">
            Medication Compliance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-indigo-600">92%</p>
          <p className="text-xs text-gray-400 mt-1">This week</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stats;
