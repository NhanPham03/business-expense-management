import StaffsTable from "@/components/staffs/StaffsTable";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function StaffsList() {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col p-4 rounded-lg bg-card shadow-lg">
      <div className="mb-4 text-card-foreground">
        {/* Header */}
        <div className="flex mb-3 justify-between items-center">
          <h2 className="text-2xl font-bold">Staff Information</h2>

          <Button className="gap-2" 
            type="button"
            onClick={() => navigate("/config/staff/add")}
          >
            <FaPlus />
            <span>Add Staff</span>
          </Button>
        </div>

        {/* Table */}
        <StaffsTable />
      </div>
    </div>
  );
}
