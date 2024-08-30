import { Column, ColumnDef, FilterFn, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, Table as ReactTable, SortingState, useReactTable } from "@tanstack/react-table";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { Button } from "./button";
import { HiChevronDoubleLeft, HiChevronDoubleRight, HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { HTMLAttributes, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import DebouncedInput from "../shared/DebouncedInput";
import { LuArrowDown, LuArrowUp, LuArrowUpDown } from "react-icons/lu";
import { cn } from "@/lib/utils/shadcn.utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { useNavigate } from "react-router-dom";

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value)
  addMeta({ 
    itemRank, 
  });
  return itemRank.passed;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchPlaceholder?: string;
}

interface DataTableColumnHeaderProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

interface DataTablePaginationProps<TData> {
  table: ReactTable<TData>;
}

export function DataTable<TData, TValue>({ 
  columns, 
  data, 
  searchPlaceholder = "Search...",
}: DataTableProps<TData, TValue>) {
  const navigate = useNavigate();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [rowSelection, setRowSelection] = useState({});
  const pageSizes = [5, 10, 20, 50];

  const table = useReactTable({
    data, 
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: pageSizes[0],
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
  });

  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: table.getRowModel().rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex flex-row pb-3 justify-between items-center">
        <div className="flex items-center gap-2">
          <span>Show</span>
          <Select value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[70px] bg-background">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent>
              {pageSizes.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span>per page</span>
        </div>

        <DebouncedInput value={globalFilter ?? ""} 
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder={searchPlaceholder}
          width={400}
        />
      </div>

      <div>
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      </div>

      {/* Table */}
      <div className="pb-3 rounded-md border" ref={parentRef}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="text-center"
                    key={header.id}
                  >
                    {header.isPlaceholder ? null : 
                      flexRender(header.column.columnDef.header, 
                      header.getContext())
                    }
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = table.getRowModel().rows[virtualRow.index];

              return (
                <TableRow key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}
                      onClick={() => navigate(`/config/staff/${row.getValue("_id")}`)}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
            {rowVirtualizer.getVirtualItems().length === 0 && (
              <TableRow>
                <TableCell className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <Button className={cn("gap-2", className)}
      variant={"ghost"}
      onClick={() => column.toggleSorting()}
    >
      <span >{title}</span>
      <div className="text-lg">
        {{
          asc: <LuArrowUp />,
          desc: <LuArrowDown />,
        }[column.getIsSorted() as string]}
        {!column.getIsSorted() && <LuArrowUpDown />}
      </div>
    </Button>
  );
}

function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <Button className="hidden lg:flex aspect-square p-0"
        variant={"outline"}
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <HiChevronDoubleLeft />
      </Button>
      <Button className="aspect-square p-0"
        variant={"outline"}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <HiChevronLeft />
      </Button>
      <Button className="aspect-square p-0"
        variant={"outline"}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <HiChevronRight />
      </Button>
      <Button className="hidden lg:flex aspect-square p-0"
        variant={"outline"}
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <HiChevronDoubleRight />
      </Button>
    </div>
  );
}
