"use client"
import { ColumnDef } from "@tanstack/react-table"

export type MedsType= {
    id: string
    residentName:string,
    medsname:string,
    stength:number
    frequency: string,
    dose:number
    count:number
    
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


