"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Download, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

const ResidentProfilePage = () => {
  const resident = {
    name: "Alice Mathew",
    age: 82,
    gender: "Female",
    room: "103",
    photo:
      "https://e7.pngegg.com/pngimages/436/585/png-clipart-computer-icons-user-account-graphics-account-icon-vector-icons-silhouette.png",
    bio: "Alice is a retired school teacher who enjoys reading and gardening. She has been with our care home for 2 years and loves participating in social activities.",
    gp: {
      name: "Dr. James Allen",
      clinic: "Greenhill Medical Centre",
      contact: "028 1234 5678",
      email: "j.allen@gmc.co.uk",
    },
    logs: [
      { activity: "Shower", time: "Today - 8:00 AM" },
      { activity: "Grooming", time: "Today - 8:30 AM" },
      { activity: "Breakfast", time: "Today - 9:00 AM" },
    ],
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
            src={resident.photo}
            alt={resident.name}
            width={100}
            height={100}
            className="rounded-full object-cover"
          />
          <div className="text-center space-y-1">
            <h2 className="text-xl font-semibold">{resident.name}</h2>
            <p className="text-muted-foreground">
              Room {resident.room} • Age {resident.age} • {resident.gender}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="text-md font-medium mb-2">Bio</h3>
          <p className="text-sm text-gray-600">{resident.bio}</p>
        </CardContent>
      </Card>

      {/* GP Details */}
      <Card>
        <CardHeader>
          <h3 className="text-md font-medium">GP Details</h3>
        </CardHeader>
        <CardContent className="text-sm text-gray-700 space-y-1">
          <p><strong>Name:</strong> {resident.gp.name}</p>
          <p><strong>Clinic:</strong> {resident.gp.clinic}</p>
          <p><strong>Contact:</strong> {resident.gp.contact}</p>
          <p><strong>Email:</strong> {resident.gp.email}</p>
        </CardContent>
      </Card>

      {/* Personal Care Logs */}
      <Card>
        <CardHeader>
          <h3 className="text-md font-medium">Recent Activities</h3>
        </CardHeader>
        <CardContent className="text-sm text-gray-700 space-y-2">
          {resident.logs.map((log, index) => (
            <div key={index} className="flex justify-between">
              <span>{log.activity}</span>
              <span className="text-muted-foreground">{log.time}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Downloads */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={16} />
          Download Care Plan
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download size={16} />
          Download Reports
        </Button>
      </div>
    </div>
  );
};

export default ResidentProfilePage;
