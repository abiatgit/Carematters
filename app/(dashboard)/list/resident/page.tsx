"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, Eye } from "lucide-react";

const dummyStaff = [
  { name: "Alice Mathew", unit: "Ceridwen" },
  { name: "John Benny", unit: "Comgal" },
  { name: "Maria Philip", unit: "Ceridwen" },
  { name: "Tom Sebastian", unit: "Comgal" },
  { name: "Liya Jose", unit: "Ceridwen" },
  { name: "Robert Zach", unit: "Comgal" },
];

export default function StaffPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Staff List</h1>
        <Button variant="default" className="flex items-center gap-2">
          <Plus size={16} />
          Add Staff
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <div>
              <h2 className="text-sm font-medium">{dummyStaff[0].name}</h2>
              <p className="text-xs text-muted-foreground">
                {dummyStaff[0].unit}
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <Eye size={18} />
            </Button>
          </CardHeader>
          <CardContent />
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <div>
              <h2 className="text-sm font-medium">{dummyStaff[1].name}</h2>
              <p className="text-xs text-muted-foreground">
                {dummyStaff[1].unit}
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <Eye size={18} />
            </Button>
          </CardHeader>
          <CardContent />
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <div>
              <h2 className="text-sm font-medium">{dummyStaff[2].name}</h2>
              <p className="text-xs text-muted-foreground">
                {dummyStaff[2].unit}
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <Eye size={18} />
            </Button>
          </CardHeader>
          <CardContent />
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <div>
              <h2 className="text-sm font-medium">{dummyStaff[3].name}</h2>
              <p className="text-xs text-muted-foreground">
                {dummyStaff[3].unit}
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <Eye size={18} />
            </Button>
          </CardHeader>
          <CardContent />
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <div>
              <h2 className="text-sm font-medium">{dummyStaff[4].name}</h2>
              <p className="text-xs text-muted-foreground">
                {dummyStaff[4].unit}
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <Eye size={18} />
            </Button>
          </CardHeader>
          <CardContent />
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
            <div>
              <h2 className="text-sm font-medium">{dummyStaff[5].name}</h2>
              <p className="text-xs text-muted-foreground">
                {dummyStaff[5].unit}
              </p>
            </div>
            <Button variant="ghost" size="icon">
              <Eye size={18} />
            </Button>
          </CardHeader>
          <CardContent />
        </Card>
      </div>
    </div>
  );
}
