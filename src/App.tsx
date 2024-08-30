import { useEffect, useState } from "react";
import Router from "@lib/router/Router";
import getRoutes from "@lib/router/routes/routes.config";
import publicRoutes from "./lib/router/routes/public.routes";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "./lib/redux/redux.config";
import { toast } from "./components/ui/use-toast";
import { useDispatch } from "react-redux";
import { clearError, clearMessage } from "./lib/redux/reducers/toast.reducer";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { title, error, message } = useSelector((state: RootState) => state.toast);
  const [routes, setRoutes] = useState([...publicRoutes]);
  

  useEffect(() => {
    setRoutes([...routes, getRoutes()]);
  }, []);

  useEffect(() => {
    if (error) {
      toast({ variant: "destructive", title, description: error });
      dispatch(clearError());
    }
    if (message) {
      toast({ variant: "default", title, description: message });
      dispatch(clearMessage());
    }
  }, [error, message]);

  return <Router routes={routes} />;
}

export default App;
