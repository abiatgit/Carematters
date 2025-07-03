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
            className="flex items-center justify-center p-3 rounded-sm"
            key={house?.id}
          >
            <CardHeader className="flex items-center justify-center ">
              <CardTitle className="text-xl">{house?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <h1>Total Residents :{house?.residents?.length} </h1>
              <h1 className="mt-3">Total Staff :{house?.staff?.length}</h1>
            </CardContent>
            <CardFooter>
              <Badge className="w-20 border-red-700 bg-rose-100 hover:bg-red-300" variant="outline" >
                Delete
              </Badge>
            </CardFooter>
          </Card>
        );
      })}
      <Card className="flex items-center justify-center p-3 rounded-sm">
        <CardContent>
          <CreateHouse onHouseCreated={refreshHouses} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
