import { lazy, Suspense } from "react";
import { CustomRouteObject } from "../Router";

const AdminDashboard = lazy(() => import("@views/admin/AdminDashboard"));

const StaffsList = lazy(() => import("@views/admin/staffs/StaffsList"));
const StaffsCreate = lazy(() => import("@views/admin/staffs/StaffsCreate"));
const StaffsDetails = lazy(() => import("@views/admin/staffs/StaffsDetails"));

const ProjectsList = lazy(() => import("@views/admin/projects/ProjectsList"));
const ProjectsCreate = lazy(() => import("@views/admin/projects/ProjectsCreate"));
const ProjectsDetails = lazy(() => import("@views/admin/projects/ProjectsDetails"));

const PendingStaffsList = lazy(() => import("@views/admin/pending-staffs/PendingStaffsList"));
const PendingStaffsDetails = lazy(() => import("@views/admin/pending-staffs/PendingStaffsDetails"));

const adminRoutes: CustomRouteObject[] = [
  // ADMIN DASHBOARD
  {
    path: "/admin/dashboard",
    element: <Suspense><AdminDashboard /></Suspense>,
    role: "admin",
  },

  // STAFF OPERATIONS
  {
    path: "/config/staff",
    element: <Suspense><StaffsList /></Suspense>,
    role: "admin",
  },
  {
    path: "/config/staff/create",
    element: <Suspense><StaffsCreate /></Suspense>,
    role: "admin",
  },
  {
    path: "/config/staff/:staff_id",
    element: <Suspense><StaffsDetails /></Suspense>,
    role: "admin",
  },

  // PROJECT OPERATIONS
  {
    path: "/config/project",
    element: <Suspense><ProjectsList /></Suspense>,
    role: "admin",
  },
  {
    path: "/config/project/create",
    element: <Suspense><ProjectsCreate /></Suspense>,
    role: "admin",
  },
  {
    path: "/config/project/:project_id",
    element: <Suspense><ProjectsDetails /></Suspense>,
    role: "admin",
  },
  
  // UNAUTHORIZED STAFF OPERATIONS
  {
    path: "/config/pending-staff",
    element: <Suspense><PendingStaffsList /></Suspense>,
    role: "admin",
  },
  {
    path: "/config/pending-staff/:staff_id",
    element: <Suspense><PendingStaffsDetails /></Suspense>,
    role: "admin",
  },
];

export default adminRoutes;
