"use client";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardFooter, CardTitle } from "@/components/ui/card";
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
import { MessageCircle, Plus } from "lucide-react";
import React, { useState } from "react";
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
import { Resident, Unit } from "@prisma/client";
import { useGlobalStore } from "@/store/globalStore";
import { deleteResidentwithId, fetchResident } from "@/app/(dashboard)/list/resident/action";
import { SkeletonDemo } from "@/components/skelton";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type ExtendedResident = Resident & {
  unit: Unit
}

const Page = () => {
  const [dialogResidentId, setDialogResidentId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [unitFilter, setUnitFilter] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all");
  const { houseId, careHome, user } = useGlobalStore();
  const queryClient = useQueryClient();

  const { data: residents = [], isLoading } = useQuery({
    queryKey: ['residents', houseId],
    queryFn: async (): Promise<ExtendedResident[]> => {
      const result = await fetchResident(houseId, careHome?.id);
      return result || [];
    },
    enabled: !!houseId,
  });

  const refreshResidentCard = () => {
    queryClient.invalidateQueries({ queryKey: ['residents', houseId] });
  };


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
    refreshResidentCard();
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
        <h1 className="text-xl font-semibold">Residents List</h1>
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
          {(user?.role === "MANAGER" || user?.role === "TEAM_LEAD") && (
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
          )}
        </div>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {isLoading ? <div className="flex gap-6"><SkeletonDemo /><SkeletonDemo /><SkeletonDemo /><SkeletonDemo /></div> : filteredResident.map((resident) => {
          return (
            <Card className="p-3 hover:shadow-md transition-shadow" key={resident.id}>
              <Link href={`/list/resident/${resident.id}`}>
                <div className="flex gap-3 items-center mb-3">
                  <div className="w-12 h-12 rounded-full relative overflow-hidden flex-shrink-0 border-2 border-gray-200">
                    <img
                      alt={`${resident.name} photo`}
                      className="w-full h-full object-cover"
                      src={
                        resident.photo ||
                        "https://img.freepik.com/premium-photo/young-man-isolated-blue_1368-124991.jpg?semt=ais_hybrid&w=740"
                      }
                      onError={(e) => {
                        e.currentTarget.src = "https://img.freepik.com/premium-photo/young-man-isolated-blue_1368-124991.jpg?semt=ais_hybrid&w=740";
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-sm font-semibold truncate">{resident.name}</CardTitle>
                    <p className="text-xs text-gray-600 truncate">House: {resident.unit?.name}</p>
                  </div>
                </div>
              </Link>
              <CardFooter className="px-0 pt-0">
                <div className="flex gap-2 w-full">
                  {(user?.role === "MANAGER" || user?.role === "TEAM_LEAD") && (
                    <Dialog open={dialogResidentId === resident.id} onOpenChange={(open) => !open && setDialogResidentId(null)}>
                      <DialogTrigger asChild>
                        <Badge
                          className="flex-1 justify-center py-1 text-xs border-red-700 bg-rose-100 hover:bg-red-300 cursor-pointer"
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
                  )}
                  <Link href={`/list/messages/${resident?.id}`} className="flex-1">
                    <Badge
                      className="w-full justify-center py-1 text-xs bg-green-100 border-green-700 text-black cursor-pointer hover:bg-green-200 hover:text-white"
                    >
                      <MessageCircle className="w-3 h-3 mr-1" />
                      Text NOK
                    </Badge>
                  </Link>
                </div>

              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
