import SearchBar from "@/components/shared/SearchBar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuRadioGroup, DropdownMenuTrigger, DropdownMenuRadioItem, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export enum Status {
  DRAFT = "Draft",
  PENDING = "Pending",
  APPROVED = "Approved",
  PAID = "Paid",
  REJECTED = "Rejected",
  CANCELLED = "Cancelled",
}

interface ClaimsListProps {
  status: Status | Status[];
}

export default function ClaimsList({ status }: ClaimsListProps) {
  const [perPage, setPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {

  }, [status]);

  const handleDropdownValueChange = (value: string) => {
    setPerPage(Number(value));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col p-4 rounded-lg bg-card shadow-lg">
      {/* Header */}
      <div className="mb-4 text-card-foreground">
        <h2 className="text-2xl font-bold mb-2">
          {Array.isArray(status) ? status.join("/") : status}
        </h2>

        <div className="flex justify-between items-center">
          <div>
            <span>Showing</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-3 mx-2" variant={"outline"}>{perPage}</Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={String(perPage)} 
                  onValueChange={handleDropdownValueChange}
                >
                  <DropdownMenuRadioItem value={"5"}>5</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={"10"}>10</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value={"20"}>20</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span>entries</span>
          </div>

          <div>
            <SearchBar query={query} setQuery={setQuery} placeholder="Search..." width={400} />
          </div>
        </div>
      </div>
    </div>
  );
}
