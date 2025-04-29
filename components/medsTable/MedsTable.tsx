"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { columns } from "./columns";
import { MedsType } from "./columns";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { strict } from "assert";

async function getData() {
  return [
    {
      id: "2",
      medsname: "Ibuprofen",
      dosage: "200mg",
      count: 1,
      frequency: [ "Morning","Night"],
      route: "Oral",
      prescribedBy: "Dr. Jones",
    },
    {
      id: "2",
      medsname: "Ibuprofen",
      dosage: "200mg",
      count: 1,
      frequency: [ "Morning","Night"],
      route: "Oral",
      prescribedBy: "Dr. Jones",
    },
    {
      id: "2",
      medsname: "Ibuprofen",
      dosage: "200mg",
      count: 1,
      frequency: [ "Morning","Night","Noon"],
      route: "Oral",
      prescribedBy: "Dr. Jones",
    }
  ];
}

export default function MedsTable() {
  const [data, setData] = useState<MedsType[]>([]);


  useState(async () => {
    const data = await getData();
    setData(data);
  }, []);

  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          {columns.map((item) => (
            <TableHead key={item.id}>{item.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium ">{item.medsname}</TableCell>
            {item.frequency.includes("Morning") ? (
              <TableCell className="font-medium me-3 ">
                {item.count}
                <Checkbox id="terms" className="mx-3" />
              </TableCell>
            ) : (
              <TableCell>{"-"}</TableCell>
            )}
            {item.frequency.includes("Noon")  ? (
              <TableCell className="font-medium">{item.count}
               <Checkbox id="terms" className="mx-3" />
               </TableCell>
            ) : (
              <TableCell>{"-"}</TableCell>
            )}
           {item.frequency.includes("Night") ? (
              <TableCell className="font-medium">{item.count}
               <Checkbox id="terms" className="mx-3" /></TableCell>
            ) : (
              <TableCell>{"-"}</TableCell>
            )}
            <TableCell className="font-medium">{<Badge>Done</Badge>}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
