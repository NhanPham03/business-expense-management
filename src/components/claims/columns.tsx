import { Claim } from "@/lib/schemas/claim.schema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Claim>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "staff.name",
    header: "Staff Name",
  },
  {
    accessorKey: "project.name",
    header: "Project Name",
  },
  {
    accessorKey: "project.from",
    header: "From",
  },
  {
    accessorKey: "project.to",
    header: "To",
  },
  {
    accessorKey: "total_hours",
    header: "Total Hours",
  },
];
