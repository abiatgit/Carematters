"use client"
import { ColumnDef } from "@tanstack/react-table"

export type MedsType= {
    id: string  
    medsname:string,
    frequency: string[],
    count:number,
    dosage:string,
    route:string
    prescribedBy:string
}

export const columns: ColumnDef<MedsType>[] = [
  {
    accessorKey: "name",
    header: "Meds",
  },
  {
    accessorKey: "norning",
    header: "Morning",
  },
  {
    accessorKey: "noon",
    header: "Noon",
  },
  {
    accessorKey: "night",
    header: "Night",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
]


