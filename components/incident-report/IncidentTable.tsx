import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { columns } from "./columns";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { CircleSmall, FileText, Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Incident, Resident, Unit } from "@prisma/client";
export interface IncidetProp extends Incident {
  resident: Resident[],
  unit: Unit[]
}

const IncidentTable = ({ data }: { data: IncidetProp[] }) => {
  return (
    <div>
      <Table >
        <TableHeader>
          <TableRow>
            {columns.map((item, index) => (
              <TableHead key={index}>
                {typeof item.header === "string" ? item.header : "Header"}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody >
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Avatar>
                  <img
                    alt=""
                    src={item?.resident?.photo}
                    className="w-full h-full"
                  />

                  {/* <AvatarImage src={`${item?.resident.photo}`} alt="@shadcn" /> */}
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{item.resident?.name}</TableCell>
              <TableCell className="font-medium">
                {item?.title}
              </TableCell>
              <TableCell className="font-medium">
                <Badge
                  variant="outline"
                  className="flex gap-1 rounded-lg text-xs"
                >
                  <CircleSmall
                    className={cn(
                      item.status === "serious"
                        ? "text-red-600"
                        : item.status === "medium"
                          ? "text-yellow-500"
                          : "text-green-700"
                    )}
                  />
                  {item?.status}
                </Badge>
              </TableCell>
              <TableCell className="font-medium">{item?.unit.name}</TableCell>
              <TableCell className="font-medium flex items-center justify-center">
                <Dialog>
                  <DialogTrigger>
                    <FileText />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Incident Report</DialogTitle>
                      <DialogDescription>
                        {item.description}
                        <div className="mt-4">
                          <Button>
                            forward <Share></Share>
                          </Button>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  );
};

export default IncidentTable;
