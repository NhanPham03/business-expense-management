import { FiSidebar } from "react-icons/fi";
import ReactLogo from "@/assets/react.svg";

interface HeaderProps {
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}

export default function Header({ showSideBar, setShowSideBar }: HeaderProps) {
  return (
    <div className="sticky w-full left-0 top-0 z-30">
      <div className="flex flex-row px-4 py-2.5 ml-0 lg:ml-[250px] bg-[#007AAC] justify-between items-center shadow-md">
        {/* Show side bar button */}
        <button className="flex w-8 h-8 lg:hidden rounded-md bg-white hover:bg-[#F1F6F9] hover:shadow-md justify-center items-center transition-all"
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <span className="text-xl"><FiSidebar /></span>
        </button>

        <div className="flex flex-1 justify-end items-center relative">
          <div className="flex items-center gap-5">
            {/* Mini profile */}
            <div className="flex flex-row gap-3">
              <div className="flex flex-col text-white text-end">
                <h2 className="text-md font-bold">{"User"}</h2>
                <span className="text-[14px] font-normal">{"Role"}</span>
              </div>

              <button className="bg-white rounded-full focus:ring-4 focus:ring-gray-300"
                type="button"
              >
                <img className="w-12 h-12 rounded-full" src={ReactLogo} alt="avatar.png" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
