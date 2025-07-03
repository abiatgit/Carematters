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
import { Avatar } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { CircleSmall, FileText, Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Incident, Resident, Unit } from "@prisma/client";
export interface IncidetProp extends Incident {
  resident: Resident,
  unit: Unit
}

const IncidentTable = ({ data }: { data: IncidetProp[] }) => {
  console.log("IncidetProp", data)
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
                    src={item?.resident?.photo || "data:image/jpeg;base64,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"}
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
              <TableCell className="font-medium">{item?.unit?.name}</TableCell>
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
