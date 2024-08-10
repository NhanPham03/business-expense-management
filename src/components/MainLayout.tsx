import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Suspense, useState } from "react";
import clsx from "clsx";

export default function MainLayout() {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div className="flex flex-row w-full min-h-screen bg-[#F1F6F9]">
      {/* Dims background when SideBar active */}
      <div onClick={() => setShowSidebar(!showSidebar)}
      className={clsx("fixed lg:hidden w-screen h-screen top-0 left-0 z-40 duration-200 bg-gray-500/80",
        {
          "invisible": !showSidebar,
          "visible": showSidebar,
        }
      )}></div>

      {/* Header & Other views */}
      <div className="w-full min-h-screen">
        <Header showSideBar={showSidebar} setShowSideBar={setShowSidebar} />

        <div className="transition-all">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-fit min-h-screen">
        <Sidebar showSidebar={showSidebar} />
      </div>
    </div>
  );
}
