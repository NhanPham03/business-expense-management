import { AppDispatch, RootState } from "@/lib/redux/redux.config";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "../ui/data-table";
import { columns } from "./claims.columns";
import { useEffect } from "react";
import { getAllClaims } from "@/lib/redux/reducers/claims.reducer";

export default function ClaimsTable() {
  const dispatch = useDispatch<AppDispatch>();
  const { claims } = useSelector((state: RootState) => state.claims);

  useEffect(() => {
    dispatch(getAllClaims());
  }, []);

  return (
    <div>
      <DataTable columns={columns} data={claims} />
    </div>
  );
}
