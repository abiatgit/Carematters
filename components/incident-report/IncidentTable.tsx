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

import { Incident, columns } from "./columns";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { CircleSmall, FileText, Share } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const IncidentTable = ({ data }: { data: Incident[] }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((item, index) => (
            <TableHead key={index}>
              {typeof item.header === "string" ? item.header : "Header"}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <Avatar>
                <AvatarImage src={`${item?.photo}`} alt="@shadcn" />
              </Avatar>
            </TableCell>
            <TableCell className="font-medium">{item?.name}</TableCell>
            <TableCell className="font-medium">
              {item?.incidentNature}
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
            <TableCell className="font-medium">{item?.house}</TableCell>
            <TableCell className="font-medium flex items-center justify-center">
              <Dialog>
                <DialogTrigger>
                  <FileText />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Incident Report</DialogTitle>
                    <DialogDescription>
                      On April 25, 2025, at approximately 2:45 PM, resident Mary
                      Thomas was found on the floor near the dining area by
                      Support Worker James. She reported feeling dizzy before
                      attempting to stand, resulting in a fall. No visible
                      injuries were observed, but she appeared shaken. A full
                      body check was completed, and vital signs were stable. The
                      nurse on duty was informed immediately, and a GP review
                      was requested. The area was dry and clear of obstacles.
                      The incident was logged, and the family was informed.
                      Preventive measures, including regular hydration and
                      assisted mobility, have been reinforced with the care
                      team.
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
  );
};

export default IncidentTable;
