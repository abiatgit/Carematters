import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { houseList } from "@/lib/mockData";
import { Plus } from "lucide-react";

const Page = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
      {houseList.map((house) => {
        return (
          <Card
            className="flex items-center justify-center p-3"
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
              <Button className="w-full" variant="destructive">
                Delete
              </Button>
            </CardFooter>
          </Card>
        );
      })}
      <Card className="flex items-center justify-center p-3">
        <CardContent>
          <Button className="w-full" variant={"secondary"}>
        <Plus/>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
