import { RouteObject, useRoutes } from 'react-router-dom';

export default function Router({ routes }: { routes: RouteObject[] }) {
  return useRoutes([...routes]);
}
