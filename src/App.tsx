import { useEffect, useState } from "react";
import Router from "@lib/router/Router";
import getRoutes from "@lib/router/routes/routes.config";
import publicRoutes from "./lib/router/routes/public.routes";

function App() {
  const [routes, setRoutes] = useState([...publicRoutes]);

  useEffect(() => {
    setRoutes([...routes, getRoutes()]);
  }, []);

  return <Router routes={routes} />;
}

export default App;
