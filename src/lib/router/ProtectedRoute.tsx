import { Navigate } from "react-router-dom";
import { RootState } from "../redux/redux.config";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles: string[];
}

export default function ProtectedRoute({ element, allowedRoles }: ProtectedRouteProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user.role) {
    return <Navigate to={"/login"} replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={"/forbidden"} replace />;
  }

  return element;
}
