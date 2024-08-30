import ProjectsTable from "@/components/projects/ProjectsTable";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function ProjectsList() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-4 rounded-lg bg-card shadow-lg">
      <div className="mb-4 text-card-foreground">
        {/* Header */}
        <div className="flex mb-3 justify-between items-center">
          <h2 className="text-2xl font-bold">Project Information</h2>

          <Button className="gap-2" 
            type="button"
            onClick={() => navigate("/config/project/add")}
          >
            <FaPlus />
            <span>Add Project</span>
          </Button>
        </div>

        {/* Table */}
        <ProjectsTable />
      </div>
    </div>
  );
}
