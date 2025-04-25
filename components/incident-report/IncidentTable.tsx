import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import {Incident, columns } from "./columns";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { CircleSmall,FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const IncidentTable = ({ data }: { data:Incident[] }) => {
  return (
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
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">
              <Avatar>
                <AvatarImage src={`${item?.photo}`} alt="@shadcn" />
              </Avatar>
            </TableCell>
            <TableCell  className="font-medium">
              {item?.name}
            </TableCell>
            <TableCell  className="font-medium">
              {item?.incidentNature}
            </TableCell>
            <TableCell  className="font-medium">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
            <CircleSmall className={cn(item.status==="serious"?"text-red-600":item.status==="medium"?"text-yellow-500":"text-green-700")} />
            {item?.status}
            </Badge>
             
            </TableCell>
            <TableCell className="font-medium">
              {item?.house}
            </TableCell>
            <TableCell  className="font-medium flex items-center justify-center">
            <FileText />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    
    </Table>
  );
};

export default IncidentTable;
