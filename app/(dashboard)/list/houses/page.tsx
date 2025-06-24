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
type MinimalCareHome = {
  id: string;
  name?: string;
} | null;


const Page = () => {
  const { careHome } = useGlobalStore()
  const [allhouses, setAllhouses] = useState<any[]>([]);

  async function fetchAllHouse(careHome: MinimalCareHome) {
    console.log("all houses list page");
    if (!careHome || !careHome.id) return;
    try {
      const res = await fetch(`/api/houses?careHomeId=${encodeURIComponent(careHome.id)}`, {
        method: "GET",
      });
      const data = await res.json();
      setAllhouses(data.houses)
      console.log("all houses list page", data);
    } catch (error) {
      console.error("Failed to fetch houses:", error);
    }
  }
  const refreshHouses = () => {
    fetchAllHouse(careHome)
  };
  useEffect(() => {
    fetchAllHouse(careHome)
  }, [])
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
      {allhouses.map((house) => {
        return (
          <Card
            className="flex items-center justify-center p-3 rounded-sm"
            key={house.id}
          >
            <CardHeader className="flex items-center justify-center ">
              <CardTitle className="text-xl">{house.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <h1>Total Residents :{house.Residents} </h1>
              <h1 className="mt-3">Total Staff :{house.staff}</h1>
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
