"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

const SinglepageStaff = () => {
  const staff = {
    name: "John Benny",
    role: "Care Assistant",
    gender: "Male",
    unit: "Comgal",
    email: "john.benny@carematters.com",
    phone: "07123 456789",
    joinedDate: "12 March 2022",
    photo:
      "https://e7.pngegg.com/pngimages/436/585/png-clipart-computer-icons-user-account-graphics-account-icon-vector-icons-silhouette.png",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <Card>
        <CardHeader className="flex flex-col items-center gap-4 relative">
          <div className="absolute top-4 right-4 flex gap-2">
            <Button variant="outline" size="icon">
              <Pencil size={16} />
            </Button>
            <Button variant="destructive" size="icon">
              <Trash2 size={16} />
            </Button>
          </div>
          <Image
            src={staff.photo}
            alt={staff.name}
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold">{staff.name}</h2>
            <p className="text-muted-foreground">
              {staff.role} • {staff.gender} • Unit: {staff.unit}
            </p>
          </div>
        </CardHeader>
        <CardContent className="text-sm text-gray-700 space-y-2">
          <p><strong>Email:</strong> {staff.email}</p>
          <p><strong>Phone:</strong> {staff.phone}</p>
          <p><strong>Date Joined:</strong> {staff.joinedDate}</p>
        </CardContent>
      </Card>

      {/* Download Option */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={16} />
          Download Employment Data
        </Button>
      </div>
    </div>
  );
};

export default SinglepageStaff;
