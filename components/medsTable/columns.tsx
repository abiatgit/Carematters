"use client"
import { ColumnDef } from "@tanstack/react-table"

export type MedsType= {
    id: string
    medsname:string,
    strength?: string,
    frequency: string[],
    count:number,
    dosage:string,
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


