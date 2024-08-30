import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";

const Forbidden = lazy(() => import("@views/errors/Forbidden"));

const errorRoutes: RouteObject[] = [
  // 403 FORBIDDEN
  {
    path: "/forbidden",
    element: (
      <Suspense>
        <Forbidden />
      </Suspense>
    ),
  },
];

export default errorRoutes;
