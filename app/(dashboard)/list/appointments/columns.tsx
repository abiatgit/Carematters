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
import { ArrowUpDown } from "lucide-react";
import { deleteAppointment } from "./action";
import { toast } from "sonner";

export type Appointments = {
  id: string;
  venue: string;
  date: Date;
  time: Date;
  scheduledWith: string;
  residentName: string | null;
  residentAvatar: string | null;
  unitName: string | null;
  residentId: string;
  unitId: string;
};


export const createColumns = (onRefresh?: () => void): ColumnDef<Appointments>[] => [
  {
    accessorKey: "residentAvatar",
    header: "",
    cell: ({ row }) => {
      const avatar = row.original.residentAvatar;
      return avatar ? (
        <img src={avatar} alt="Resident" className="h-10 w-10 rounded-full" />
      ) : (
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-sm font-medium">
            {row.original.residentName?.charAt(0) || "?"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "residentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Resident Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "unitName",
    header: "House",
  },
  {
    accessorKey: "venue",
    header: "Venue",
  },
  {
    accessorKey: "scheduledWith",
    header: "Scheduled With",
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
    cell: ({ row }) => {
      const appointment = row.original;
      
      const handleDelete = async () => {
        try {
          const result = await deleteAppointment(appointment.id);
          if (result.success) {
            toast.success("Appointment deleted successfully");
            onRefresh?.();
          } else {
            toast.error("Failed to delete appointment");
          }
        } catch {
          toast.error("Failed to delete appointment");
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 m-4">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              Edit <Pencil />
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="text-red-800"
              onClick={handleDelete}
            >
              Delete
              <Trash2 />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const columns = createColumns();
