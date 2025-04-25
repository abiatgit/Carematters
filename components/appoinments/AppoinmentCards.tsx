import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Badge } from "../ui/badge";

interface Appoinment {
  id: string;
  where: string;
  date: Date;
  time: Date;
  with: string;
  residentId: string;
  unitId: string;
  avatar: string;
}
interface AppoinmentCardsProp {
  data: Appoinment[];
}

const AppoinmentCards = ({ data }: AppoinmentCardsProp) => {
  return (
    <div className="flex flex-col gap-3 ">
      {data.map((item, index) => (
        <Card
          key={index}
          className="flex flex-row  justify-between p-5 items-center"
        >
          <div className="flex gap-3 ">
            <Image
              alt="user"
              className="rounded-2xl"
              width={40}
              height={20}
              src={item.avatar}
            />

            <div className="">
              <p className="text-sm font-medium leading-none">
                {item.residentId}
              </p>
              <p className="text-sm text-muted-foreground ">{item.unitId}</p>
            </div>
          </div>

          <div>
            <div>
              <p className="text-sm font-medium leading-none">{item.where}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mt-1">
                {item.time.toLocaleString()}
              </p>
            </div>
          </div>
          <div>
          <Badge variant="secondary">{item.with}</Badge>
            {/* <p className="text-sm font-medium leading-none">{item.with}</p> */}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AppoinmentCards;
