"use client"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { CreateHouse } from "@/components/forms/houses/createHouse";
import { Badge } from "@/components/ui/badge";
import { useGlobalStore } from "@/store/globalStore";
import { fetchHousewithresident } from "./action";
import { Resident, User } from "@prisma/client";
type MinimalCareHome = {
  id: string;
  name?: string;

} | null;
type ExtendedCareHome = {
  id: string;
  name?: string;
  residents: Resident[]
  staff: User[]
} | null;

const Page = () => {
  const { careHome } = useGlobalStore()
  const [allhouses, setAllhouses] = useState<ExtendedCareHome[]>([]);

  async function fetchAllHouse(careHome: MinimalCareHome) {

    if (!careHome || !careHome.id) return;
    try {
      const res = await fetchHousewithresident(careHome.id)
      console.log("all house", res)
      setAllhouses(res!)
    } catch (error) {
      console.error("Failed to fetch houses:", error);
    }
  }
  const refreshHouses = () => {
    fetchAllHouse(careHome)
  };
  useEffect(() => {
    fetchAllHouse(careHome)
  }, [careHome])
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
      {allhouses.map((house) => {
        return (
          <Card
            className="p-4 rounded-lg border hover:shadow-md transition-shadow"
            key={house?.id}
          >
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{house?.name}</h3>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Residents: {house?.residents?.length}</span>
                <span>Staff: {house?.staff?.length}</span>
              </div>
              <Badge 
                className="w-fit text-xs border-red-700 bg-rose-100 hover:bg-red-300 cursor-pointer" 
                variant="outline"
              >
                Delete
              </Badge>
            </div>
          </Card>
        );
      })}
      <Card className="p-4 rounded-lg border hover:shadow-md transition-shadow flex items-center justify-center">
        <CreateHouse onHouseCreated={refreshHouses} />
      </Card>
    </div>
  );
};

export default Page;
