import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Suspense, useEffect, useState } from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/redux.config";
import { clearCookies, decodeToken, getCookie, isExpired } from "@/lib/utils/cookie.utils";
import { setError } from "@/lib/redux/reducers/toast.reducer";

export default function MainLayout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  useEffect(() => {
    const token = getCookie("accessToken");
    if (!token) return navigate("/login");
  
    const data = decodeToken(token);
    if (data.exp && isExpired(data.exp)) {
      dispatch(setError({ title: "Session Expired", description: "Please login again" }));
      clearCookies();
      return navigate("/login");
    } else {
      
    }
  }, []);
  
  return (
    <div className="flex flex-row w-full min-h-screen bg-background">
      {/* Dims background when SideBar active */}
      <div onClick={() => setShowSidebar(!showSidebar)}
      className={clsx("fixed lg:hidden w-screen h-screen top-0 left-0 z-40 duration-200 bg-black/50 transition-all",
        {
          "opacity-0 pointer-events-none": !showSidebar,
          "opacity-100": showSidebar,
        }
      )}></div>

      {/* Sidebar */}
      <div className="w-fit min-h-screen">
        <Sidebar showSidebar={showSidebar} />
      </div>

      {/* Header & Other views */}
      <div className="w-full min-h-screen ml-0 lg:ml-[250px]">
        <Header showSideBar={showSidebar} setShowSideBar={setShowSidebar} />

        <div className="transition-all m-2">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
