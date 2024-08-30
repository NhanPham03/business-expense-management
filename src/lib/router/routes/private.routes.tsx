import { lazy, Suspense } from "react";
import { Status } from "@views/claims/ClaimsList";
import ProtectedRoute from "../ProtectedRoute";
import { RouteObject } from "react-router-dom";

const Home = lazy(() => import("@views/Home"));

const ClaimsList = lazy(() => import("@views/claims/ClaimsList"));
const ClaimsCreate = lazy(() => import("@views/claims/ClaimsCreate"));
const ClaimsDetails = lazy(() => import("@views/claims/ClaimsDetails"));
const ClaimsVetting = lazy(() => import("@views/claims/ClaimsVetting"));

const privateRoutes: RouteObject[] = [
  // HOME PAGE
  {
    path: "/",
    element: (
      <Suspense>
        <ProtectedRoute element={<Home />} 
          allowedRoles={["admin", "claimer", "approver", "finance"]}
        />
      </Suspense>
    ),
  },
  
  // CLAIMS BY STATUS
  {
    path: "/claims/draft",
    element: (
      <Suspense>
        <ProtectedRoute element={<ClaimsList status={Status.DRAFT} />} 
          allowedRoles={["admin", "claimer"]}
        />
      </Suspense>
    ),
  },
  {
    path: "/claims/pending",
    element: (
      <Suspense>
        <ProtectedRoute element={<ClaimsList status={Status.PENDING} />} 
          allowedRoles={["admin", "claimer", "approver"]}
        />
      </Suspense>
    ),
  },
  {
    path: "/claims/approved",
    element: (
      <Suspense>
        <ProtectedRoute element={<ClaimsList status={Status.APPROVED} />} 
          allowedRoles={["admin", "claimer", "approver", "finance"]}
        />
      </Suspense>
    ),
  },
  {
    path: "/claims/paid",
    element: (
      <Suspense>
        <ProtectedRoute element={<ClaimsList status={Status.PAID} />} 
          allowedRoles={["admin", "claimer", "finance"]}
        />
      </Suspense>
    ),
  },
  {
    path: "/claims/approved-paid",
    element: (
      <Suspense>
        <ProtectedRoute element={<ClaimsList status={[Status.APPROVED, Status.PAID]} />} 
        allowedRoles={["approver"]}
        />
      </Suspense>
    ),
  },
  {
    path: "/claims/rejected-cancelled",
    element: (
      <Suspense>
        <ProtectedRoute element={<ClaimsList status={[Status.REJECTED, Status.CANCELLED]} />} 
          allowedRoles={["admin", "claimer"]}
        />
      </Suspense>
    ),
  },

  // CLAIM OPERATIONS
  {
    path: "/claims/create",
    element: (
      <Suspense>
        <ProtectedRoute element={<ClaimsCreate />} 
          allowedRoles={["claimer"]}
        />
      </Suspense>
    ),
  },
  {
    path: "/claims/:claim_id",
    element: (
      <Suspense>
        <ProtectedRoute element={<ClaimsDetails />} 
          allowedRoles={["admin", "claimer", "approver", "finance"]}
        />
      </Suspense>
    ),
  },
  {
    path: "/claims/vetting",
    element: (
      <Suspense>
        <ProtectedRoute element={<ClaimsVetting />} 
          allowedRoles={["approver"]}
        />
      </Suspense>
    ),
  },
];

export default privateRoutes;
