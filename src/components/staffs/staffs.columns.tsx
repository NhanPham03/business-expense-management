import { Staff } from "@/lib/schemas/staff.schema";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "../ui/data-table";
import { MdKey, MdKeyOff } from "react-icons/md";

export const columns: ColumnDef<Staff>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex justify-start items-center">
        <Checkbox checked={
            table.getIsAllRowsSelected() || 
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox checked={row.getIsSelected()} 
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "_id",
    filterFn: "equalsString",
    enableSorting: false,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" className="text-left" />
    ),
    cell: ({ row }) => (
      <div className="w-[6rem] truncate">{row.getValue("_id")}</div>
    ),
  },
  {
    accessorKey: "name",
    filterFn: "includesString",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Full Name" />
    ),
  },
  {
    accessorKey: "department",
    filterFn: "includesString",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dept." />
    ),
  },
  {
    accessorKey: "job_title",
    filterFn: "includesString",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Title" />
    ),
  },
  {
    accessorKey: "rank",
    filterFn: "includesString",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rank" />
    ),
  },
  {
    accessorKey: "role",
    filterFn: "includesString",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      const role: string = row.getValue("role");

      return (
        <div className="flex justify-center">
          {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
        </div>
      );
    },
  },
  {
    accessorKey: "active",
    header: "Active",
    cell: ({ row }) => (
      <div className="flex justify-center pointer-events-none">
        <Checkbox checked={row.getValue("active")} />
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Button className="text-lg"
          variant={row.getValue("active") ? "destructive" : "default"}
        >
          {row.getValue("active") ? (
            <MdKeyOff />
          ): (
            <MdKey />
          )}
        </Button>
      </div>
    ),
  },
];
