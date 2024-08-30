import { Button } from "@/components/ui/button";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function ProjectsAdd() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col p-4 rounded-lg bg-card shadow-lg">
      {/* Header */}
      <div className="flex flex-row mb-4 text-card-foreground justify-start items-center gap-2">
        <Button variant={"ghost"}
          onClick={() => navigate("/config/project")} 
        >
          <IoIosArrowBack className="text-2xl" />
        </Button>
        <h2 className="text-2xl font-bold">Add Project</h2>
      </div>
    </div>
  );
}
