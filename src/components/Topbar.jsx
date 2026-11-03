import { useState } from "react";
import { useLocation } from "react-router";
import { BsSearch } from "react-icons/bs";
import { Moon, Sun } from "lucide-react";
import { sidebarItems } from "./sidebarItems";
import NotificationDropdown from "./inbox/NotificationDropdown";
import useTheme from "../hooks/useTheme";

const iconBtn =
  "flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-zinc-900 transition hover:bg-zinc-300 dark:text-zinc-100 dark:hover:bg-zinc-800";

function Topbar() {
  const { pathname } = useLocation();
  const current = sidebarItems.find((link) => pathname.startsWith(link.to));
  const title = current?.label ?? "";
  const { isDark, toggleTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="shrink-0 border-b border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">

        {/* Title: shrinks and truncates instead of pushing things off-screen */}
        <h1 className="min-w-0 truncate text-lg font-semibold sm:text-xl">
          {title}
        </h1>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          {/* Search input: md and up */}
          <div className="relative hidden md:block">
            <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-44 rounded-lg border border-zinc-300 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 lg:w-64 dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>

          {/* Search icon: below md, toggles the search row */}
          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((prev) => !prev)}
            className={`${iconBtn} md:hidden`}
          >
            <BsSearch />
          </button>

          <NotificationDropdown className={iconBtn} />

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className={iconBtn}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile: avatar always, name only on lg+ */}
          <div className="ml-1 flex items-center gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-300 text-sm font-medium dark:bg-zinc-700">
              JA
            </div>
            <div className="hidden leading-tight lg:block">
              <p className="text-sm font-medium">Jeus Armentano</p>
              <p className="text-xs text-zinc-500">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search row */}
      {searchOpen && (
        <div className="border-t border-zinc-200 px-4 py-3 md:hidden dark:border-zinc-700">
          <div className="relative">
            <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search"
              autoFocus
              className="w-full rounded-lg border border-zinc-300 bg-zinc-50 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
        </div>
      )}
    </header>
  );
}

export default Topbar;