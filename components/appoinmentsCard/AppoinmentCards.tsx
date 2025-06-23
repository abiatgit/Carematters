import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Appoinment } from "@prisma/client";

const AppoinmentCards = ({data}:{data:Appoinment[]}) => {
console.log("dataAppoinment",data)
  return (
    <div className="flex flex-col gap-3 ">
      {data?.map((item, index) => (
        <Card
          key={index}
          className="flex flex-row  justify-between p-5  items-center"
        >
          <div className="flex  ">
            <Image
              alt="user"
              className="rounded-2xl"
              width={40}
              height={20}
              src={"https://github.com/shadcn.png"}
            />

            <div className="mx-3">
              <p className="text-sm font-medium leading-none">
                {item.resident?.name}
              </p>
              <p className="text-sm text-muted-foreground ">{item.unit.name}</p>
            </div>
          </div>

          <div>
            {/* <div>
              <p className="text-sm font-medium leading-none">{item.scheduledWith}</p>
            </div> */}
            <div>
              <p className="text-sm text-muted-foreground mt-1">
                {item.time.toLocaleString()}
              </p>
            </div>
          </div>
          <div>
            <Badge variant="secondary" className="bg-gray-400 text-gray-800">{item.scheduledWith}</Badge>
            {/* <p className="text-sm font-medium leading-none">{item.with}</p> */}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AppoinmentCards;
