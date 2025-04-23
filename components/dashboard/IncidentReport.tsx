import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const IncidentReport = () => {
  return (
    <Card className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300 space-y-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-red-600">
          Incident Reports Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="w-2.5 h-2.5 mt-1 bg-red-500 rounded-full"></span>
          <p className="text-sm text-gray-700">
            3 new incident logs this week.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span className="w-2.5 h-2.5 mt-1 bg-yellow-400 rounded-full"></span>
          <p className="text-sm text-gray-700">
            2 ongoing investigations in progress.
          </p>
        </div>

        <div className="flex items-start gap-3">
          <span className="w-2.5 h-2.5 mt-1 bg-blue-500 rounded-full"></span>
          <p className="text-sm text-gray-700">
            1 safety alert issued today.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default IncidentReport;
