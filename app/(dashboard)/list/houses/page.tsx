import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const Page = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
      <Card className="flex items-center justify-center p-3">
        <CardHeader className="flex items-center justify-center ">
          <CardTitle className="text-xl">Ceridwen</CardTitle>
        </CardHeader>
        <CardContent>
          <h1>Total Residents :01 </h1>
          <h1 className="mt-3">Total Staff :20</h1>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="destructive">Delete</Button>
        </CardFooter>
      </Card>
      <Card className="flex items-center justify-center p-3">
        <CardHeader className="flex items-center justify-center ">
          <CardTitle className="text-xl">Samaria</CardTitle>
        </CardHeader>
        <CardContent>
          <h1>Total Residents :01 </h1>
          <h1 className="mt-3">Total Staff :20</h1>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="destructive">Delete</Button>
        </CardFooter>
      </Card>
      <Card className="flex items-center justify-center p-3">
        <CardHeader className="flex items-center justify-center ">
          <CardTitle className="text-xl">Betheny</CardTitle>
        </CardHeader>
        <CardContent>
          <h1>Total Residents :01 </h1>
          <h1 className="mt-3">Total Staff :20</h1>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="destructive">Delete</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
