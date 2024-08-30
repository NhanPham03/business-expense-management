import MainLayout from "@/components/MainLayout";
import adminRoutes from "./admin.routes";
import privateRoutes from "./private.routes";
import errorRoutes from "./error.routes";

const getRoutes = () => {
  return {
    path: "/",
    element: <MainLayout />,
    children: [
      ...privateRoutes,
      ...adminRoutes,
      ...errorRoutes,
    ],
  };
};

export default getRoutes;
