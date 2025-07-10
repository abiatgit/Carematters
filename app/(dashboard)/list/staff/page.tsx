"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageCircle, Plus } from "lucide-react";
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
  SelectLabel
} from "@/components/ui/select";
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
import { Unit, User } from "@prisma/client";
import { deleteStaffwithId, fetchStaff } from "@/app/(dashboard)/list/staff/action";
import { useGlobalStore } from "@/store/globalStore";
import { SkeletonDemo } from "@/components/skelton";
type ExtendedUser = User & {
  unit: Unit;
}

export default function StaffPage() {
  const [search, setSearch] = useState("");
  const [unitFilter, setUnitFilter] = useState("all");
  const [positionFilter, setPositionFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const { houseId } = useGlobalStore();
  const [allStaff, setAllStaff] = useState<ExtendedUser[]>([]);

  async function fetchStaffClient(houseId: string | null) {
    const res = await fetchStaff(houseId);
    console.log("fetchStaffClient", res);
    const fixedStaff = (res ?? []).filter((staff) => staff.unit !== null) as ExtendedUser[];
    setAllStaff(fixedStaff);
  }
  const filteredStaff = allStaff.filter((singlestaff) => {
    const matchesSearch = singlestaff.name
      ?.toLowerCase()
      .includes(search.toLowerCase()) ?? false;
    const matchesUnit =
      unitFilter === "all" || singlestaff.unitId === unitFilter;

    const positionSearch =
      positionFilter === "all" || singlestaff.role === positionFilter;

    return matchesSearch && matchesUnit && positionSearch;
  });
  const onStaffCreated = () => {
    fetchStaffClient(houseId)
  }
  useEffect(() => {
    if (houseId) {
      fetchStaffClient(houseId);
    }
  }, [houseId]);
  const delteHandle = async (id: string) => {
    await deleteStaffwithId({ id })
    if (houseId) {
      await fetchStaffClient(houseId);
    }
  }

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
                <SelectItem value="MANAGER">Manager</SelectItem>
                <SelectItem value="TEAM_LEAD">Team Leader</SelectItem>
                <SelectItem value="SUPPORT_WORKER">Support Worker</SelectItem>
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                className="flex items-center gap-2 bg-green-700 hover:bg-green-500"
              >
                <Plus size={16} className="" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-bold">
                  Create new staff
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <CreateStaffForm setOpen={setOpen} onStaffCreated={onStaffCreated} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allStaff.length === 0 ? <div className="flex gap-6"><SkeletonDemo /> <SkeletonDemo /><SkeletonDemo /><SkeletonDemo /></div> : filteredStaff.map((staff) => {
          return (
            <Card className="px-6" key={staff.id}>
              <Link href={`/list/staff/${staff.id}`}>
                <div className="flex gap-5 items-center">
                  <div className="w-15 h-15 rounded-full relative overflow-hidden ">
                    <img
                      alt=" "
                      src={staff.image || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <CardContent className="px-0">
                      <CardTitle>Name: {staff.name}</CardTitle>
                      <h1>House: {staff.unit?.name}</h1>
                      <h1>Position: {staff.role}</h1>
                    </CardContent>
                  </div>
                </div>
              </Link>

              <CardFooter className="px-0 ">
                <div className="flex gap-3">
                  <Dialog>
                    <DialogTrigger asChild>
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
                            onClick={() => delteHandle(staff.id)}
                          >
                            Yes
                          </Badge>
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                  <Link href={`/list/messages/${staff?.id}`}>
                  <Badge
                    className="bg-green-100 w-20 border-green-700 text-black cursor-pointer hover:bg-green-200 hover:text-white"
                  >
                    <MessageCircle className="text-2xl" />
                    Message
                  </Badge></Link>
                </div>
              </CardFooter>

            </Card>
          );
        })}
      </div>
    </div>
  );
}
