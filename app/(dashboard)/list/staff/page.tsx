"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import Image from "next/image";
import { staff } from "@/lib/mockData";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateStaffForm from "@/components/forms/Staff/CreateStaffForm";
import { Badge } from "@/components/ui/badge";

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
            <BreadcrumbLink href="/user">Dashboard</BreadcrumbLink>
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
          <Dialog>
            <DialogTrigger>
              <Button
                variant="default"
                className="flex items-center gap-2 bg-green-700 hover:bg-green-500"
              >
                <Plus size={16} className="" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent>
              <CreateStaffForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredStaff.map((staff) => {
          return (
            <Card className="px-6" key={staff.name}>
              <Link href={"/list/staff/32"}>
                <div className="flex gap-5 items-center">
                  <div className="w-15 h-15 rounded-full relative overflow-hidden ">
                    <Image
                      alt=" "
                      src={"https://github.com/shadcn.png"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <CardContent className="px-0">
                      <CardTitle>Name: {staff.name}</CardTitle>
                      <h1>House: {staff.unitId}</h1>
                      <h1>Position: {staff.role}</h1>
                    </CardContent>
                  </div>
                </div>
              </Link>
              <CardFooter className="px-0 ">
                <Dialog>
                  <DialogTrigger>
                    <Badge
                      className="w-20 border-red-700 bg-rose-100 hover:bg-red-300"
                      variant="outline"
                    >
                      Delete
                    </Badge>
                  </DialogTrigger>
                  <DialogContent className="flex items-center justify-center">
                    <DialogHeader>
                      <DialogTitle>
                        Are you absolutely sure to delete?
                      </DialogTitle>
                      <DialogDescription className="flex items-center justify-center mt-3">
                        <Badge
                          variant={"destructive"}
                          className="bg-red-300 w-20 border-red-700 text-black cursor-pointer hover:bg-red-600 hover:text-white"
                        >
                          Yes
                        </Badge>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
