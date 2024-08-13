import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const Login = lazy(() => import("@views/auth/Login"));
const Register = lazy(() => import("@views/auth/Register"));
const ResetPassword = lazy(() => import("@views/auth/ResetPassword"));

const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Suspense><Login /></Suspense>,
  },
  {
    path: "/register",
    element: <Suspense><Register /></Suspense>,
  },
  {
    path: "/reset-password",
    element: <Suspense><ResetPassword /></Suspense>,
  },
];

export default publicRoutes;
