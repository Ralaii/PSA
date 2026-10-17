// src/layouts/AuthLayout.jsx
import { Outlet } from "react-router";
import { Moon, Sun } from "lucide-react";
import useTheme from "../hooks/useTheme";
import loginPhoto from "../assets/pylon2022.jpg";

export default function AuthLayout() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="relative min-h-screen">
      <img
        src={loginPhoto}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/20 transition-colors dark:bg-black/60" />

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className="absolute right-4 top-4 z-20 flex size-10 cursor-pointer items-center justify-center rounded-full bg-white/80 text-zinc-900 shadow-md backdrop-blur transition hover:bg-white dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:bg-zinc-800"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <main className="relative z-10 flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-md rounded-2xl bg-white/85 p-8 shadow-xl backdrop-blur-md transition-colors dark:bg-zinc-900/85">
          <Outlet />
        </div>
      </main>
    </div>
  );
}