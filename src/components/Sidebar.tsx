import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";
import Logo from "@/components/shared/Logo";
import NavLinks from "@/components/NavLinks";
import { IoLogOutOutline } from "react-icons/io5";

interface SidebarProps {
  showSidebar: boolean;
}

export default function Sidebar({ showSidebar }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <div className={clsx("fixed flex flex-col w-[250px] h-screen top-0 z-50 bg-popover shadow-md lg:shadow-none duration-100 transition-all",
      {
        "-left-[250px] lg:left-0": !showSidebar,
        "left-0": showSidebar,
      }
    )}>
      {/* Top SideBar logo */}
      <div>
        <Link to={"/"}>
          <Logo />
        </Link>
      </div>

      {/* Links by role */}
      <div>
        <NavLinks />
      </div>

      {/* Empty flex box */}
      <div className="hidden h-auto w-full grow rounded-md md:block"></div>

      {/* Log out button */}
      <button className="flex w-full px-3 py-2 mb-2 justify-start items-center transition-all gap-2 hover:bg-primary-foreground text-foreground hover:shadow-md hover:pl-5"
        onClick={handleLogout}
      >
        <span className="text-xl"><IoLogOutOutline /></span>
        <span>Log out</span>
      </button>
    </div>
  );
}
