import { AppDispatch, RootState } from "@/lib/redux/redux.config";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "../ui/data-table";
import { columns } from "./staffs.columns";
import { getAllStaffs } from "@/lib/redux/reducers/staffs.reducer";

export default function StaffsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { staffs } = useSelector((state: RootState) => state.staffs);

  useEffect(() => {
    dispatch(getAllStaffs());
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={staffs} />
    </div>
  );
}
