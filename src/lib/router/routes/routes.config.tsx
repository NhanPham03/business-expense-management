import adminRoutes from "./admin.routes";
import privateRoutes from "./private.routes";

const getRoutes = () => {
  return {
    path: "/",
    element: <></>,
    children: [
      ...privateRoutes,
      ...adminRoutes,
    ],
  };
};

export default getRoutes;
