import { Suspense } from "react";
import { RouteObject } from "react-router-dom";

const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Suspense></Suspense>,
  },
  {
    path: "/register",
    element: <Suspense></Suspense>,
  },
  {
    path: "/reset-password",
    element: <Suspense></Suspense>,
  },
];

export default publicRoutes;
