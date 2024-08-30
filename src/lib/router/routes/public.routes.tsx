import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Login = lazy(() => import("@views/auth/Login"));
const Register = lazy(() => import("@views/auth/Register"));
const ResetPassword = lazy(() => import("@views/auth/ResetPassword"));

const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
];

export default publicRoutes;
