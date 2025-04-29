"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {Plus } from "lucide-react";
import Image from "next/image";
import { staff } from "@/lib/mockData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectLabel } from "@radix-ui/react-select";
import Link from "next/link";

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [unitFilter, setUnitFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");

  const filteredStaff = staff.filter((singlestaff) => {
    const matchesSearch = singlestaff.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesUnit =
      unitFilter === "all" || singlestaff.unitId === unitFilter;

    const positionSearch =
      positionFilter === "all" || singlestaff.role === positionFilter;

    return matchesSearch && matchesUnit && positionSearch;
  });

  return (
    <div className="">
        <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/manager">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/list/staff/">Staff</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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
              <SelectGroup>
              <SelectLabel>Select a Position</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="teamLead">Team Leader</SelectItem>
              <SelectItem value="supportWorker">Support Worker</SelectItem>
              {/* <SelectItem value="Comgal">Support Worker</SelectItem> */}
              </SelectGroup>
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
      <Link href={"/list/staff/32"}>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStaff.map((staff) => {
          return (
            <Card
              key={staff.name}
              className=" flex  hover:scale-105 shadow-lg transition-all transform hover:shadow-xl cursor-pointer"
            >
              <CardHeader className="">
                <Image
                  className="rounded-2xl object-cover"
                  alt=""
                  src={staff.photo}
                  width={100}
                  height={200}
                ></Image>
              </CardHeader>
              <CardContent className="">
                <h2 className="text-lg font-semibold tracking-tight">
                  {staff.name}
                </h2>
                <p className="leading-7">{staff.unitId}</p>
                <p className="leading-7  text-sm text-green-700">
                  {staff.role}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      </Link>
    </div>
  );
}
