import { lazy, Suspense } from "react";
import { CustomRouteObject } from "../Router";

const Home = lazy(() => import("@views/Home"));

const ClaimsList = lazy(() => import("@views/claims/ClaimsList"));
const ClaimsCreate = lazy(() => import("@views/claims/ClaimsCreate"));
const ClaimsDetails = lazy(() => import("@views/claims/ClaimsDetails"));
const ClaimsVetting = lazy(() => import("@views/claims/ClaimsVetting"));

const privateRoutes: CustomRouteObject[] = [
  // HOME PAGE
  {
    path: "/",
    element: <Suspense><Home /></Suspense>,
    role: ["admin", "claimer", "approver", "finance"],
  },
  
  // CLAIMS BY STATUS
  {
    path: "/claims/draft",
    element: <Suspense><ClaimsList status="draft" /></Suspense>,
    role: ["admin", "claimer"],
  },
  {
    path: "/claims/pending",
    element: <Suspense><ClaimsList status="pending" /></Suspense>,
    role: ["admin", "claimer", "approver"],
  },
  {
    path: "/claims/approved",
    element: <Suspense><ClaimsList status="approved" /></Suspense>,
    role: ["admin", "claimer", "approver", "finance"],
  },
  {
    path: "/claims/paid",
    element: <Suspense><ClaimsList status="paid" /></Suspense>,
    role: ["admin", "claimer", "finance"],
  },
  {
    path: "/claims/approved-paid",
    element: <Suspense><ClaimsList status={["approved", "paid"]} /></Suspense>,
    role: "approver"
  },
  {
    path: "/claims/rejected-cancelled",
    element: <Suspense><ClaimsList status={["rejected", "cancelled"]} /></Suspense>,
    role: ["admin", "claimer"],
  },

  // CLAIM OPERATIONS
  {
    path: "/claims/create",
    element: <Suspense><ClaimsCreate /></Suspense>,
    role: "claimer",
  },
  {
    path: "/claims/:claim_id",
    element: <Suspense><ClaimsDetails /></Suspense>,
    role: ["admin", "claimer", "approver", "finance"],
  },
  {
    path: "/claims/vetting",
    element: <Suspense><ClaimsVetting /></Suspense>,
    role: "approver"
  },
];

export default privateRoutes;
