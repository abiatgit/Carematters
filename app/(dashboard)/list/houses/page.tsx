
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { houseList } from "@/lib/mockData";
import { CreateHouse } from "@/components/forms/houses/createHouse";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
      {houseList.map((house) => {
        return (
          <Card
            className="flex items-center justify-center p-3 rounded-sm"
            key={house.name}
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
          <CreateHouse />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
