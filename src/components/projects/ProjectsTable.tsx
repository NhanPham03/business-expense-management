import { AppDispatch, RootState } from "@/lib/redux/redux.config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "../ui/data-table";
import { columns } from "./projects.columns";
import { getAllProjects } from "@/lib/redux/reducers/projects.reducer";

export default function ProjectsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { projects } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(getAllProjects());
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={projects} />
    </div>
  );
}
