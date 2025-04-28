"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Image from "next/image";
import { staff } from "@/lib/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [unitFilter, setUnitFilter] = useState("all");
  const [positionFilter,setPositionFilter]=useState("all")

  const filteredStaff = staff.filter((singlestaff) => {
    const matchesSearch = singlestaff.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesUnit =
      unitFilter === "all" || singlestaff.unitId === unitFilter;


    const positionSearch=
    positionFilter==="all"|| singlestaff.role ===positionFilter;

    return matchesSearch && matchesUnit && positionSearch

  
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
          <Select onValueChange={setPositionFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Filter by Position" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="teamLead">Team Leader</SelectItem>
              <SelectItem value="supportWorker">Support Worker</SelectItem>
              {/* <SelectItem value="Comgal">Support Worker</SelectItem> */}
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
              <SelectItem value="Betheny">Betheny</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="default"
            className="flex items-center gap-2 bg-green-700 hover:bg-green-500"
          >
            <Plus size={16} className="" />
            Add Staff
          </Button>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredStaff.map((staff) => {
          return (
            <div key={staff.name}>
              <Card className="p-2 flex-row hover:scale-105 shadow-lg transition-all transform hover:shadow-xl cursor-pointer">
                <div className="rounded-3xl object-cover">
                  <Image
                    className="rounded-2xl object-cover"
                    alt=""
                    src={staff.photo}
                    width={100}
                    height={200}
                  ></Image>
                </div>
                <div>
                  <h2 className="text-lg font-semibold tracking-tight">
                    {staff.name}
                  </h2>
                  <p className="leading-7">{staff.unitId}</p>
                  <p className="leading-7  text-sm text-green-700">
                    {staff.role}
                  </p>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
}
