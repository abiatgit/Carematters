
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
// import { EnrichedAppointment } from "@/app/(dashboard)/list/appoinments/action";
import { SkeletonDemo } from "../skelton";
import { MapPin } from "lucide-react";
import { Appoinment } from "@prisma/client";
import { Avatar } from "../ui/avatar";



type EnrichedAppoinment = Appoinment & {
  residentName: string | null
  residentAvatar?: string | null
  unitName: string | null
};


type Props = {
  data: EnrichedAppoinment[];
};

const AppoinmentCards = ({ data }: Props) => {
  console.log("appoinment data", data)
  return data.length == 0 ? (<div className="flex flex-col gap-5">
    <SkeletonDemo />
    <SkeletonDemo />
    <SkeletonDemo />
  </div>) :
    (
      <div className="flex flex-col gap-3 ">
        {data?.map((item, index) => (
          <Card
            key={index}
            className="flex flex-row  justify-between p-5  items-center"
          >
            <div className="flex">
              <Avatar className="w-10 h-10 overflow-hidden rounded-full">
                <img
                  src={item.residentAvatar || "https://github.com/shadcn.png"}
                  alt="Resident"
                  className="w-full h-full object-cover"
                />
              </Avatar>

              {/* <img
                alt="user"
                className="rounded-2xl"
                width="50"
                height="50"
                src={item.residentAvatar || "https://github.com/shadcn.png"}
              /> */}

              <div className="mx-3">
                <p className="text-sm font-medium leading-none">
                  {item?.residentName}
                </p>
                <p className="text-sm text-muted-foreground ">{item?.unitName}</p>
              </div>
            </div>

            <div>
              <div>
                <p className="text-sm font-medium leading-none">{item.scheduledWith}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.time.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-gray-400 text-gray-800">{item.venue}</Badge>
              <MapPin />
            </div>
          </Card>
        ))}
      </div>
    );
};

export default AppoinmentCards;
