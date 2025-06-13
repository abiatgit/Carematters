import { ColumnDef } from "@tanstack/react-table";

export type Incident = {
  id: string;
  photo: string;
  name: string;
  incidentNature: string;
  date: string;
  house: string;
  status:string
};

export const columns: ColumnDef<Incident>[] = [
  {
    accessorKey: "photo",
    header: "",
    },
    {
        accessorKey: "name",
        header: "Resident",
      },
  {
    accessorKey: "incidentNature",
    header: "IncidentNature",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "house",
    header: "House",
  },
  {
    accessorKey: "repor",
    header: "View Report",
  }
];
