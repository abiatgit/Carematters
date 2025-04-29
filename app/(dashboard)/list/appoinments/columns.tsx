"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { ArrowUpDown } from "lucide-react"

export type Appoinments = {
  id: string;
  where: string;
  date: Date;
  time: Date;
  with: string;
  avatar: string;
  residentId: string;
  unitId: string;
};

export const columns: ColumnDef<Appoinments>[] = [
  {
    accessorKey: "Photo",
    header: "",
  },
  {
    accessorKey: "residentId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "unitId",
    header: "House",
  },
  {
    accessorKey: "where",
    header: "Place",
  },
  {
    accessorKey: "with",
    header: "Person",
  },
  {
    accessorKey: "date",
    header: () => <div className="text-right">Date</div>,
    cell: ({ row }) => {
      const date = row.original.date;
      const Formatteddate = date.toLocaleDateString("en-GB");
      return <div className="text-right font-medium">{Formatteddate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({}) => {
      return (
        <DropdownMenu  >
          <DropdownMenuTrigger asChild >
            <Button variant="ghost" className="h-8 w-8 p-0 m-4">
              <MoreHorizontal className="h-4 w-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              Edit <Pencil />
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-800">
              Delete
              <Trash2 />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
