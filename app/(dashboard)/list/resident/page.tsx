"use client";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet,  SheetTrigger } from "@/components/ui/sheet";
import CreateResidentForm from "@/components/forms/Residents/CreateResidentForm";

const Page = () => {
  const [search, setSearch] = useState("");
 const [unitFilter,setUnitFilter]=useState("all")
 const [genderFilter,setGenderFilter]=useState("all")

 const filteredResident= residednt.filter((singleResident)=>{
        const searchMatchResident= singleResident.name
        .toLowerCase()
        .includes(search.toLowerCase())
        const unitMatchResident=
        unitFilter==="all" || singleResident.unitId=== unitFilter
 })
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/manager">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/list/resident/">Resident</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-xl font-semibold">Resident List</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search staff by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="find by Houses" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a house</SelectLabel>
                <SelectItem value="ceridewen">Ceridwen</SelectItem>
                <SelectItem value="comgal">Comgal</SelectItem>
                <SelectItem value="betheny">Betheny</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a Gender</SelectLabel>
                <SelectItem value="ceridewen">Male</SelectItem>
                <SelectItem value="comgal">Female</SelectItem>
                <SelectItem value="betheny">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Sheet>
          <SheetTrigger asChild>
          <Button
          
            variant="default"
            className="flex items-center gap-2 bg-green-700 hover:bg-green-500"
          >
            <Plus size={16} className="" />
            Add Resident
          </Button>
          </SheetTrigger>
          <CreateResidentForm/>
          </Sheet>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
     {/* {filteredResident.map((resident) => {
            return (
              <Card className="px-6" key={staff.name}>
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
                <CardFooter className="px-0 ">
                  <Button variant="outline" className="text-red-600">Delete</Button>
                </CardFooter>
              </Card>
            );
          })} */}
      </div>
    </div>
  );
};

export default Page;
