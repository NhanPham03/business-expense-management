import { FiSidebar } from "react-icons/fi";
import ReactLogo from "@/assets/react.svg";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/redux.config";

interface HeaderProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}

export default function Header({ showSideBar, setShowSideBar }: HeaderProps) {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="sticky w-full left-0 top-0 z-30">
      <div className="flex flex-row px-4 py-2.5 bg-popover justify-between items-center shadow-md">
        {/* Show side bar button */}
        <Button className="lg:hidden transition-all" variant={"outline"} size={"icon"}
          onClick={() => setShowSideBar(!showSideBar)}>
          <span className="text-xl"><FiSidebar /></span>
        </Button>

        <div className="flex flex-1 justify-end items-center relative">
          <div className="flex items-center gap-5">
            {/* Mini profile */}
            <div className="flex flex-row gap-3">
              <div className="flex flex-col my-auto text-popover-foreground text-end">
                <h2 className="text-md font-bold">{user.name}</h2>
                <span className="text-sm font-mono uppercase">{user.role}</span>
              </div>

              <button className="bg-background rounded-full focus:ring-4 focus:ring-gray-300"
                type="button"
              >
                <img className="w-12 h-12 rounded-full" src={ReactLogo} alt="avatar.png" />
              </button>

              <div className="flex justify-center items-center">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
