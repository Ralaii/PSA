// context/SettingsContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [hoverExpand, setHoverExpand] = useState(() => {
    try {
      return localStorage.getItem("sidebarHoverExpand") !== "false";
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("sidebarHoverExpand", String(hoverExpand));
    } catch {}
  }, [hoverExpand]);

  return (
    <SettingsContext.Provider value={{ hoverExpand, setHoverExpand }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);