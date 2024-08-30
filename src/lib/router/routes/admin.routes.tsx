import { lazy, Suspense } from "react";
import ProtectedRoute from "../ProtectedRoute";
import { RouteObject } from "react-router-dom";

const AdminDashboard = lazy(() => import("@views/admin/AdminDashboard"));

const StaffsList = lazy(() => import("@views/admin/staffs/StaffsList"));
const StaffsAdd = lazy(() => import("@/views/admin/staffs/StaffsAdd"));
const StaffsDetails = lazy(() => import("@views/admin/staffs/StaffsDetails"));

const ProjectsList = lazy(() => import("@views/admin/projects/ProjectsList"));
const ProjectsAdd = lazy(() => import("@/views/admin/projects/ProjectsAdd"));
const ProjectsDetails = lazy(() => import("@views/admin/projects/ProjectsDetails"));

const PendingStaffsList = lazy(() => import("@views/admin/pending-staffs/PendingStaffsList"));
const PendingStaffsDetails = lazy(() => import("@views/admin/pending-staffs/PendingStaffsDetails"));

const adminRoutes: RouteObject[] = [
  // ADMIN DASHBOARD
  {
    path: "/admin/dashboard",
    element: (
      <Suspense>
        <ProtectedRoute element={<AdminDashboard />} 
          allowedRoles={["admin"]}
        />
      </Suspense>
    ),
  },

  // STAFF OPERATIONS
  {
    path: "/config/staff",
    element: (
      <Suspense>
        <ProtectedRoute element={<StaffsList />}
          allowedRoles={["admin"]}
        />
      </Suspense>
    ),
  },
  {
    path: "/config/staff/add",
    element: (
      <Suspense>
        <ProtectedRoute element={<StaffsAdd />}
          allowedRoles={["admin"]}
        />
      </Suspense>
    ),
  },
  {
    path: "/config/staff/:staff_id",
    element: (
      <Suspense>
        <ProtectedRoute element={<StaffsDetails />} 
          allowedRoles={["admin"]} 
        />
      </Suspense>
    ),
  },

  // PROJECT OPERATIONS
  {
    path: "/config/project",
    element: (
      <Suspense>
        <ProtectedRoute element={<ProjectsList />} 
          allowedRoles={["admin"]} 
        />
      </Suspense>
    ),
  },
  {
    path: "/config/project/add",
    element: (
      <Suspense>
        <ProtectedRoute element={<ProjectsAdd />} 
          allowedRoles={["admin"]} 
        />
      </Suspense>
    ),
  },
  {
    path: "/config/project/:project_id",
    element: (
      <Suspense>
        <ProtectedRoute element={<ProjectsDetails />} 
          allowedRoles={["admin"]} 
        />
      </Suspense>
    ),
  },
  
  // UNAUTHORIZED STAFF OPERATIONS
  {
    path: "/config/pending-staff",
    element: (
      <Suspense>
        <ProtectedRoute element={<PendingStaffsList />} 
          allowedRoles={["admin"]} 
        />
      </Suspense>
    ),
  },
  {
    path: "/config/pending-staff/:staff_id",
    element: (
      <Suspense>
        <ProtectedRoute element={<PendingStaffsDetails />} 
          allowedRoles={["admin"]} 
        />
      </Suspense>
    ),
  },
];

export default adminRoutes;
