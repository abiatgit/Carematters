"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Eye,  } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const dummyStaff = [
  { name: "Alice Mathew", unit: "Ceridwen" },
  { name: "John Benny", unit: "Comgal" },
  { name: "Maria Philip", unit: "Ceridwen" },
  { name: "Tom Sebastian", unit: "Comgal" },
  { name: "Liya Jose", unit: "Ceridwen" },
  { name: "Robert Zach", unit: "Comgal" },
  { name: "Akhil Thomas", unit: "Ceridwen" },
  { name: "Sneha Vinod", unit: "Comgal" },
  { name: "Neenu Babu", unit: "Ceridwen" },
  { name: "Manu James", unit: "Comgal" },
];

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [unitFilter, setUnitFilter] = useState("all");

  const filteredStaff = dummyStaff.filter((staff) => {
    const matchesSearch = staff.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesUnit = unitFilter === "all" || staff.unit === unitFilter;
    return matchesSearch && matchesUnit;
  });

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-xl font-semibold">Staff List</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search staff by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Ceridwen">Team Leader</SelectItem>
              <SelectItem value="Comgal">S Support Worker</SelectItem>
              <SelectItem value="Comgal">Support Worker</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setUnitFilter} defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Ceridwen">Ceridwen</SelectItem>
              <SelectItem value="Comgal">Comgal</SelectItem>
         
            </SelectContent>
          </Select>
          <Button variant="default" className="flex items-center gap-2">
            <Plus size={16} />
            Add Staff
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {filteredStaff.map((staff, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between p-4 pb-2">
              <div className="flex items-center gap-4">
                <Image
                  src="https://e7.pngegg.com/pngimages/436/585/png-clipart-computer-icons-user-account-graphics-account-icon-vector-icons-silhouette.png"
                  alt={staff.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div>
                  <h2 className="text-md font-medium">{staff.name}</h2>
                  <p className="text-sm text-muted-foreground">{staff.unit}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="bg-gray-300">
                  <Link href={`/list/staff/${index}`}>
                    <Eye size={18} />
                  </Link>
                </Button>
               
              </div>
            </CardHeader>
            <CardContent />
          </Card>
        ))}
      </div>
    </div>
  );
}
