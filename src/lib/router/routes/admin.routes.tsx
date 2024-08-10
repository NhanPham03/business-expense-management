import { Suspense } from "react";
import { CustomRouteObject } from "../Router";

const adminRoutes: CustomRouteObject[] = [
  // ADMIN DASHBOARD
  {
    path: "/admin/dashboard",
    element: <Suspense></Suspense>,
    role: "admin",
  },

  // STAFF OPERATIONS
  {
    path: "/config/staff",
    element: <Suspense></Suspense>,
    role: "admin",
  },
  {
    path: "/config/staff/create",
    element: <Suspense></Suspense>,
    role: "admin",
  },
  {
    path: "/config/staff/:staff_id",
    element: <Suspense></Suspense>,
    role: "admin",
  },

  // PROJECT OPERATIONS
  {
    path: "/config/project",
    element: <Suspense></Suspense>,
    role: "admin",
  },
  {
    path: "/config/project/create",
    element: <Suspense></Suspense>,
    role: "admin",
  },
  {
    path: "/config/project/:project_id",
    element: <Suspense></Suspense>,
    role: "admin",
  },
  
  // UNAUTHORIZED STAFF OPERATIONS
  {
    path: "/config/pending-staff",
    element: <Suspense></Suspense>,
    role: "admin",
  },
  {
    path: "/config/pending-staff/:staff_id",
    element: <Suspense></Suspense>,
    role: "admin",
  },
];

export default adminRoutes;
