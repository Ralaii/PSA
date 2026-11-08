import { useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import PsaLogo from "../assets/imgs/PsaLogo.webp";
import SidebarLinks from "./SidebarLinks";

function SidebarRelative({ collapsed, setCollapsed }) {
  const [hovered, setHovered] = useState(false);
  const expanded = !collapsed || hovered;

  const handleToggle = () => {
    setCollapsed((prev) => !prev);
    setHovered(false);
  };

  return (
    <div
      className={`relative h-screen shrink-0 transition-[width] duration-300 ease-in-out ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <aside
        onMouseEnter={() =>
          window.matchMedia("(hover: hover)").matches && setHovered(true)
        }
        onMouseLeave={() => setHovered(false)}
        className={`absolute inset-y-0 left-0 z-20 flex flex-col overflow-hidden border-r border-zinc-300 bg-zinc-200 p-3 transition-[width,box-shadow] duration-300 ease-in-out dark:border-zinc-700 dark:bg-zinc-900 ${
          expanded ? "w-64" : "w-20"
        } ${collapsed && hovered ? "shadow-xl" : ""}`}
      >
        <div className="relative mb-6 flex items-center">
          <button
            onClick={handleToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="ml-[10px] shrink-0 cursor-pointer rounded-lg p-2 text-xl text-zinc-900 transition hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            {collapsed ? <GoSidebarExpand /> : <GoSidebarCollapse />}
          </button>

          <img
            src={PsaLogo}
            alt="PSA Logo"
            className={`absolute right-2 h-10 w-auto shrink-0 transition-opacity duration-200 ${
              expanded ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
        </div>

        <SidebarLinks collapsed={!expanded} />
      </aside>
    </div>
  );
}

export default SidebarRelative;