import { NavLink } from "react-router";
import { sidebarItems } from "./sidebarItems";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 overflow-hidden rounded-lg px-4 py-2 text-zinc-900 transition dark:text-zinc-100 ${
    isActive
      ? "bg-zinc-300 font-medium dark:bg-zinc-700"
      : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
  }`;

function SidebarLinks({ collapsed, onNavigate }) {
  return (
    <ul className="space-y-1">
      {sidebarItems.map(({ to, label, icon: Icon }) => (
        <li key={to}>
          <NavLink
            to={to}
            onClick={onNavigate}
            title={collapsed ? label : undefined}
            className={linkClass}
          >
            <span className="flex size-6 shrink-0 items-center justify-center text-xl">
              <Icon />
            </span>
            <span
              className={`whitespace-nowrap transition-opacity duration-200 ${
                collapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              {label}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default SidebarLinks;