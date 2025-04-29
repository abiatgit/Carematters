"use client";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartLegendContent } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [search, setSearch] = useState("");
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
          <Button
            variant="default"
            className="flex items-center gap-2 bg-green-700 hover:bg-green-500"
          >
            <Plus size={16} className="" />
            Add Resident
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <Link href={"/list/resident/302"}>
          <Card>
            <div className="w-5 h-12 rounded-sm  relative overflow-hidden">
              <Image
                alt=""
                src={"https://randomuser.me/api/portraits/women/14.jpg"}
                fill
                className="object-cover"
              ></Image>
            </div>
            <CardContent>
              <CardTitle>Name</CardTitle>
            </CardContent>
            <CardFooter>405</CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Page;

{
  /* Resident Cards */
}
// <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
{
  /* {filteredResidents.map((resident, index) => (
          <Card
            key={index}
            className="relative hover:shadow-md transition-shadow p-2"
          >
        

            <CardHeader className="flex  flex-col items-center p-2 pb-2 gap-2">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/c/ce/HH_Polizeihauptmeister_MZ.jpg"
                alt={resident.name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
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
        ))} */
}
