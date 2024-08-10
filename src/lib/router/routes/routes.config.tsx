import MainLayout from "@/components/MainLayout";
import adminRoutes from "./admin.routes";
import privateRoutes from "./private.routes";

const getRoutes = () => {
  return {
    path: "/",
    element: <MainLayout />,
    children: [
      ...privateRoutes,
      ...adminRoutes,
    ],
  };
};

export default getRoutes;
