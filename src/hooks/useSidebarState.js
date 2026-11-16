import { useEffect, useState } from "react";

const DESKTOP_QUERY = "(min-width: 768px)";

export function useSidebarState() {
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return localStorage.getItem("sidebarCollapsed") === "true";
    } catch {
      return false;
    }
  });
  const [mobileOpen, setMobileOpen] = useState(false); // phones: drawer open or closed

  useEffect(() => {
    try {
      localStorage.setItem("sidebarCollapsed", String(collapsed));
    } catch {}
  }, [collapsed])

  // Close the drawer if the screen grows to desktop size
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e) => e.matches && setMobileOpen(false);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Escape closes the drawer
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return {
     collapsed, 
     setCollapsed, 
     mobileOpen, 
     setMobileOpen 
  };
}