import { Project } from "@/lib/schemas/project.schema";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "active",
    header: "Active",
  },
  {
    accessorKey: "project_manager",
    header: "PM",
  },
  {
    accessorKey: "quality_assurance",
    header: "QA",
  },
];
