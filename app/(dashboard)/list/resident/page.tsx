"use client";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
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
import React, { useEffect, useState } from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import CreateResidentForm from "@/components/forms/Residents/CreateResidentForm";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Resident, Unit} from "@prisma/client";
import { useGlobalStore } from "@/store/globalStore";
import { deleteResidentwithId, fetchResident } from "@/app/(dashboard)/list/resident/action";
import { SkeletonDemo } from "@/components/skelton";

 type ExtendedResident= Resident &{
     unit:Unit
 }

const Page = () => {
  const [dialogResidentId, setDialogResidentId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [residents, setResident] = useState<ExtendedResident[]>([]);
  const [unitFilter, setUnitFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const { houseId } = useGlobalStore();
  async function fetchResidentsClient(houseId: string | null) {
    const res = await fetchResident(houseId)
    setResident(res!)

  }
  const refreshResidentCard = async () => {
    if (houseId) {
      const res = await fetchResident(houseId);
      setResident(res!);
    }
  }

  useEffect(() => {
    if (houseId) {
      fetchResidentsClient(houseId);
    }
  }, [houseId]);


  const filteredResident = residents.filter((singleResident) => {
    const searchMatchResident = singleResident
      .name!.toLowerCase()
      .includes(search.toLowerCase());
    const unitMatchResident =
      unitFilter === "all" || singleResident.unitId === unitFilter;
    const genderMatchResident =
      genderFilter === "all" || singleResident.gender === genderFilter;
    return searchMatchResident && unitMatchResident && genderMatchResident;
  });
  const delteHandle = async (id: string) => {
    await deleteResidentwithId(id)
    if (houseId) {
      await fetchResidentsClient(houseId);
    }
  }
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/user">Dashboard</BreadcrumbLink>
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
          <Select onValueChange={setUnitFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="find by Houses" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a house</SelectLabel>
                <SelectItem value="all">all</SelectItem>
                <SelectItem value="ceridewen">Ceridwen</SelectItem>
                <SelectItem value="comgal">Comgal</SelectItem>
                <SelectItem value="betheny">Betheny</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select onValueChange={setGenderFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select a Gender</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="betheny">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild onClick={() => setOpen(true)}>
              <Button
                variant="default"
                className="flex items-center gap-2 bg-green-700 hover:bg-green-500"
              >
                <Plus size={16} className="" />
                Add Resident
              </Button>
            </SheetTrigger>
            <CreateResidentForm setOpen={setOpen} onResidentCreated={refreshResidentCard} />
          </Sheet>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {residents.length === 0 ? <div className="flex gap-6"><SkeletonDemo /><SkeletonDemo /><SkeletonDemo /><SkeletonDemo /></div> : filteredResident.map((resident) => {
          return (
            <Card className="px-6" key={resident.id}>
              <Link href={`/list/resident/${resident.id}`}>
                <div className="flex gap-5 items-center">
                  <div className="w-15 h-15 rounded-full relative overflow-hidden ">
                    <img
                      alt=" "
                      className="w-full h-full object-cover"
                      src={
                        resident.photo ||
                        "https://img.freepik.com/premium-photo/young-man-isolated-blue_1368-124991.jpg?semt=ais_hybrid&w=740"
                      }
                    />
                  </div>
                  <div>
                    <CardContent className="px-0">
                      <CardTitle>Name: {resident.name}</CardTitle>
                      <h1>House: {resident.unit?.name}</h1>
                    </CardContent>
                  </div>
                </div>
              </Link>
              <CardFooter className="px-0 ">
                <Dialog open={dialogResidentId === resident.id} onOpenChange={(open) => !open && setDialogResidentId(null)}>

                  <DialogTrigger asChild>
                    <Badge
                      className="w-20 border-red-700 bg-rose-100 hover:bg-red-300"
                      variant="outline"
                      onClick={() => setDialogResidentId(resident.id)}
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
                          onClick={() => delteHandle(resident.id)}

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
};

export default Page;
