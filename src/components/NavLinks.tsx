import { FaRegClock } from "react-icons/fa";
import { MdOutlineCancel, MdOutlineCreditScore, MdOutlineDashboard } from "react-icons/md";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { IoMdAddCircleOutline, IoMdCheckmarkCircleOutline } from "react-icons/io";
import { LuUserCheck2, LuUsers2 } from "react-icons/lu";
import { RiDraftLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const links = [
  // #region CLAIMER
  {
    name: "Create Claims",
    icon: <IoMdAddCircleOutline />,
    role: "claimer",
    path: "/claims/create",
  },
  {
    section: "My Claims",
    role: "claimer",
    subLinks: [
      {
        name: "Draft",
        icon: <RiDraftLine />,
        path: "/claims/draft",
      },
      {
        name: "Pending Approval",
        icon: <FaRegClock />,
        path: "/claims/pending",
      },
      {
        name: "Approved",
        icon: <IoMdCheckmarkCircleOutline />,
        path: "/claims/approved",
      },
      {
        name: "Paid",
        icon: <MdOutlineCreditScore />,
        path: "/claims/paid",
      },
      {
        name: "Rejected/Cancelled",
        icon: <MdOutlineCancel />,
        path: "/claims/rejected-cancelled",
      },
    ],
  },
  // #endregion

  // #region APPROVER
  {
    section: "Claims for Approval",
    role: "approver",
    subLinks: [
      {
        name: "For my Vetting",
        icon: <IoMdCheckmarkCircleOutline />,
        path: "/claims/vetting",
      },
      {
        name: "Approved/Paid",
        icon: <MdOutlineCreditScore />,
        path: "/claims/approved-paid",
      },
    ],
  },
  // #endregion

  // #region FINANCE
  {
    section: "Claims for Finance",
    role: "finance",
    subLinks: [
      {
        name: "Approved",
        icon: <IoMdCheckmarkCircleOutline />,
        path: "/claims/approved",
      },
      {
        name: "Paid",
        icon: <MdOutlineCreditScore />,
        path: "/claims/paid",
      },
    ],
  },
  // #endregion

  // #region ADMIN
  {
    name: "Dashboard",
    icon: <MdOutlineDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    section: "Claims",
    role: "admin",
    subLinks: [
      {
        name: "Draft",
        icon: <RiDraftLine />,
        path: "/claims/draft",
      },
      {
        name: "Pending Approval",
        icon: <FaRegClock />,
        path: "/claims/pending",
      },
      {
        name: "Approved",
        icon: <IoMdCheckmarkCircleOutline />,
        path: "/claims/approved",
      },
      {
        name: "Paid",
        icon: <MdOutlineCreditScore />,
        path: "/claims/paid",
      },
      {
        name: "Rejected/Cancelled",
        icon: <MdOutlineCancel />,
        path: "/claims/rejected-cancelled",
      },
    ],
  },
  {
    section: "Configuration",
    role: "admin",
    subLinks: [
      {
        name: "Staff Information",
        icon: <LuUsers2 />,
        path: "/config/staff",
      },
      {
        name: "Project Information",
        icon: <HiOutlineClipboardDocumentList />,
        path: "/config/project",
      },
      {
        name: "Authorize Staff",
        icon: <LuUserCheck2 />,
        path: "/config/pending-staff",
      },
    ],
  },
  // #endregion
];

export default function NavLinks() {
  const { pathname } = useLocation();
  const [navLinks, setNavLinks] = useState<typeof links>([]);

  const getNavLinks = (role: string) => {
    const navLinks = [];

    for (const link of links) {
      if (link.role === role) {
        navLinks.push(link);
      }
    }
    return navLinks;
  };

  useEffect(() => {
    const links = getNavLinks("admin");
    setNavLinks(links);
  }, []);

  return (
    <ul>
      {navLinks.map((navLink) => navLink.section ? 
        ( // Generate Sections with SubLinks
          <li key={navLink.section}>
            <Link to={"/claims"}
              className="flex items-center px-4 pt-2 text-gray-400 border-t-2 font-bold text-sm uppercase"
            >
              <span>{navLink.section}</span>
            </Link>

            <ul className="pl-4">
              {navLink.subLinks.map((subLink) => 
                (
                  <li key={subLink.name}>
                    <Link to={subLink.path}
                      className={clsx("flex w-full px-3 py-2 my-2 justify-start items-center transition-all gap-2 rounded-l-lg hover:pl-5",
                      {
                        "bg-[#007AAC] text-white font-bold": pathname === subLink.path,
                        "hover:bg-[#F1F6F9] hover:shadow-md text-black": pathname !== subLink.path,
                      }
                    )}>
                      <span className="text-xl">{subLink.icon}</span>
                      <span>{subLink.name}</span>
                    </Link>
                  </li>
                )
              )}
            </ul>
          </li>
        ) : ( // Generate NavLinks without Sections
          <li className="pl-4" key={navLink.name}>
            <Link to={navLink.path || ""}
              className={clsx("flex w-full px-3 py-2 my-2 justify-start items-center transition-all gap-2 rounded-l-lg hover:pl-5",
              {
                "bg-[#007AAC] text-white font-bold": pathname === navLink.path,
                "hover:bg-[#F1F6F9] hover:shadow-md text-black": pathname !== navLink.path,
              }
            )}>
              <span className="text-xl">{navLink.icon}</span>
              <span>{navLink.name}</span>
            </Link>
          </li>
        )
      )}
    </ul>
  );
}
