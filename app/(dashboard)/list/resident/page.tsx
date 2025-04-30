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
import { Plus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link href={"/list/resident/302"}>
          <Card className="flex flex-row gap-18 ">
            <CardHeader>
              <Avatar className="h-[80] w-[80]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <p>Name: Abi</p>
              <p>Unit: Ceridwen</p>
              <p>Room: 301</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={"/list/resident/302"}>
          <Card className="flex flex-row gap-18 ">
            <CardHeader>
              <Avatar className="h-[80] w-[80]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <p>Name: Abi</p>
              <p>Unit: Ceridwen</p>
              <p>Room: 301</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={"/list/resident/302"}>
          <Card className="flex flex-row gap-18 ">
            <CardHeader>
              <Avatar className="h-[80] w-[80]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <p>Name: Abi</p>
              <p>Unit: Ceridwen</p>
              <p>Room: 301</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={"/list/resident/302"}>
          <Card className="flex flex-row gap-18 ">
            <CardHeader>
              <Avatar className="h-[80] w-[80]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <p>Name: Abi</p>
              <p>Unit: Ceridwen</p>
              <p>Room: 301</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={"/list/resident/302"}>
          <Card className="flex flex-row gap-18 ">
            <CardHeader>
              <Avatar className="h-[80] w-[80]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <p>Name: Abi</p>
              <p>Unit: Ceridwen</p>
              <p>Room: 301</p>
            </CardContent>
          </Card>
        </Link>

        <Link href={"/list/resident/302"}>
          <Card className="flex flex-row gap-18 ">
            <CardHeader>
              <Avatar className="h-[80] w-[80]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <p>Name: Abi</p>
              <p>Unit: Ceridwen</p>
              <p>Room: 301</p>
            </CardContent>
          </Card>
        </Link>
        <Link href={"/list/resident/302"}>
          <Card className="flex flex-row gap-18 ">
            <CardHeader>
              <Avatar className="h-[80] w-[80]">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent>
              <p>Name: Abi</p>
              <p>Unit: Ceridwen</p>
              <p>Room: 301</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default Page;
