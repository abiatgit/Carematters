"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Eye,  } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const dummyResidents = [
  {
    name: "Annie Mathew",
    room: "101",
    age: 78,
    gender: "female",
    unit: "Unit 1",
    photo:
      "https://e7.pngegg.com/pngimages/436/585/png-clipart-computer-icons-user-account-graphics-account-icon-vector-icons-silhouette.png",
  },
  {
    name: "George John",
    room: "102",
    age: 83,
    gender: "male",
    unit: "Unit 2",
    photo: "/residents/george.jpg",
  },
  {
    name: "Sara Thomas",
    room: "103",
    age: 75,
    gender: "female",
    unit: "Unit 3",
    photo: "/residents/sara.jpg",
  },
  // Add more residents as needed
];

export default function ResidentListPage() {
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [unitFilter, setUnitFilter] = useState("");

  const filteredResidents = dummyResidents.filter((resident) => {
    const matchesSearch = resident.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesGender = genderFilter
      ? resident.gender === genderFilter
      : true;
    const matchesUnit = unitFilter ? resident.unit === unitFilter : true;
    return matchesSearch && matchesGender && matchesUnit;
  });

  return (
    <div className="p-6">
      {/* Top Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-semibold">Resident List</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <Input
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-[200px]"
          />
          <Select onValueChange={setGenderFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setUnitFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select Unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Unit 1">Unit 1</SelectItem>
              <SelectItem value="Unit 2">Unit 2</SelectItem>
              <SelectItem value="Unit 3">Unit 3</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="default" className="flex items-center gap-2">
            <Plus size={16} />
            Add Resident
          </Button>
        </div>
      </div>

      {/* Resident Cards */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredResidents.map((resident, index) => (
          <Card
            key={index}
            className="relative hover:shadow-md transition-shadow"
          >
        

            <CardHeader className="flex flex-col items-center p-4 pb-2 gap-2">
              <Image
                src="https://e7.pngegg.com/pngimages/436/585/png-clipart-computer-icons-user-account-graphics-account-icon-vector-icons-silhouette.png"
                alt={resident.name}
                width={80}
                height={80}
                className="rounded-full object-cover"
              />
              <div className="text-center">
                <h2 className="text-md font-medium">{resident.name}</h2>
                <p className="text-sm text-muted-foreground">
                  Room {resident.room} • Age {resident.age}
                </p>
              </div>
            </CardHeader>

            <CardContent className="flex justify-center">
              <Button variant="ghost" size="icon">
                <Link href={`/list/resident/${index}`}>
                  <Eye size={18} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
