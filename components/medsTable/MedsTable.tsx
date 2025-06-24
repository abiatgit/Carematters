"use client";
import React, { useEffect, useState } from "react";
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
import { flexRender, useReactTable, getCoreRowModel } from "@tanstack/react-table";

async function getData() {
  return [
    {
      id: "2",
      medsname: "Ibuprofen",
      dosage: "200mg",
      count: 1,
      frequency: ["Morning", "Night"],
      route: "Oral",
      prescribedBy: "Dr. Jones"
    },
    {
      id: "3",
      medsname: "Ibuprofen",
      dosage: "200mg",
      count: 1,
      frequency: ["Morning", "Night"],
      route: "Oral",
      prescribedBy: "Dr. Jones"
    },
    {
      id: "4",
      medsname: "Ibuprofen",
      dosage: "200mg",
      count: 1,
      frequency: ["Morning", "Night", "Noon"],
      route: "Oral",
      prescribedBy: "Dr. Jones"
    },
  ];
}

export default function MedsTable() {
  const [data, setData] = useState<MedsType[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getData();
      setData(data);
    }
    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Table className="mt-5">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.original.medsname}</TableCell>
            {row.original.frequency.includes("Morning") ? (
              <TableCell className="font-medium me-3">
                {row.original.count}
                <Checkbox id="terms" className="mx-3" />
              </TableCell>
            ) : (
              <TableCell>{"-"}</TableCell>
            )}
            {row.original.frequency.includes("Noon") ? (
              <TableCell className="font-medium">
                {row.original.count}
                <Checkbox id="terms" className="mx-3" />
              </TableCell>
            ) : (
              <TableCell>{"-"}</TableCell>
            )}
            {row.original.frequency.includes("Night") ? (
              <TableCell className="font-medium">
                {row.original.count}
                <Checkbox id="terms" className="mx-3" />
              </TableCell>
            ) : (
              <TableCell>{"-"}</TableCell>
            )}
            <TableCell className="font-medium">{<Badge className="bg-green-600">Done</Badge>}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
