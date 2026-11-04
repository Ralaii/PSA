import { useState } from "react";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import PsaLogo from "../assets/imgs/PsaLogo.webp";
import SidebarLinks from "./SidebarLinks";

// Hover-expand only on devices that can hover and are wider than a phone
const HOVER_QUERY = "(hover: hover) and (min-width: 768px)";
const canHoverExpand = () => window.matchMedia(HOVER_QUERY).matches;

function Sidebar({ collapsed, setCollapsed, mobileOpen, onCloseMobile }) {
  const [hovered, setHovered] = useState(false);

  // The phone drawer is always full width, whatever the desktop state is
  const rail = collapsed && !mobileOpen;
  const expanded = !rail || hovered;

  const handleToggle = () => {
    if (mobileOpen) onCloseMobile(); // inside the drawer, the button closes it
    else setCollapsed((prev) => !prev);
    setHovered(false);
  };

  return (
    <>
      {/* Spacer: the width the page layout sees on md+. Phones have none. */}
      <div
        className={`hidden h-screen shrink-0 transition-[width] duration-300 ease-in-out md:block ${
          collapsed ? "w-20" : "w-64"
        }`}
      />

      <aside
        onMouseEnter={() => canHoverExpand() && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col overflow-hidden border-r border-zinc-300 bg-zinc-200 p-3 transition-[width,box-shadow,transform] duration-300 ease-in-out md:translate-x-0 dark:border-zinc-700 dark:bg-zinc-900 ${
          expanded ? "md:w-64" : "md:w-20"
        } ${mobileOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"} ${
          rail && hovered ? "shadow-xl" : ""
        }`}
      >
        <div className="relative mb-6 flex items-center">
          <button
            onClick={handleToggle}
            aria-label={rail ? "Expand sidebar" : "Collapse sidebar"}
            className="ml-[10px] shrink-0 cursor-pointer rounded-lg p-2 text-xl text-zinc-900 transition hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            {rail ? <GoSidebarExpand /> : <GoSidebarCollapse />}
          </button>

          <img
            src={PsaLogo}
            alt="PSA Logo"
            className={`absolute right-2 h-10 w-auto shrink-0 transition-opacity duration-200 ${
              expanded ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />
        </div>

        <SidebarLinks collapsed={!expanded} onNavigate={onCloseMobile} />
      </aside>
    </>
  );
}

export default Sidebar;