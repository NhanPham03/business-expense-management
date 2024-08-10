import { Suspense } from "react";
import { CustomRouteObject } from "../Router";

const privateRoutes: CustomRouteObject[] = [
  // HOME PAGE
  {
    path: "/",
    element: <Suspense></Suspense>,
    role: ["admin", "claimer", "approver", "finance"],
  },
  
  // CLAIMS BY STATUS
  {
    path: "/claims/draft",
    element: <Suspense></Suspense>,
    role: ["admin", "claimer"],
  },
  {
    path: "/claims/pending",
    element: <Suspense></Suspense>,
    role: ["admin", "claimer", "approver"],
  },
  {
    path: "/claims/approved",
    element: <Suspense></Suspense>,
    role: ["admin", "claimer", "approver", "finance"],
  },
  {
    path: "/claims/paid",
    element: <Suspense></Suspense>,
    role: ["admin", "claimer", "finance"],
  },
  {
    path: "/claims/approved-paid",
    element: <Suspense></Suspense>,
    role: "approver"
  },
  {
    path: "/claims/rejected-cancelled",
    element: <Suspense></Suspense>,
    role: ["admin", "claimer"],
  },

  // CLAIM OPERATIONS
  {
    path: "/claims/create",
    element: <Suspense></Suspense>,
    role: "claimer",
  },
  {
    path: "/claims/:claim_id",
    element: <Suspense></Suspense>,
    role: ["admin", "claimer", "approver", "finance"],
  },
  {
    path: "/claims/vetting",
    element: <Suspense></Suspense>,
    role: "approver"
  },
];

export default privateRoutes;
