import { useEffect, useRef, useState } from "react";

const PHONE_QUERY = "(max-width: 767px)"; // below Tailwind's md breakpoint

export function useSidebarCollapse() {
  const [collapsed, setCollapsed] = useState(
    () => window.matchMedia(PHONE_QUERY).matches
  );

  const collapsedRef = useRef(collapsed); // always holds the latest value
  const desktopState = useRef(false); // what the sidebar looked like before shrinking

  useEffect(() => {
    collapsedRef.current = collapsed;
  }, [collapsed]);

  useEffect(() => {
    const mql = window.matchMedia(PHONE_QUERY);

    const handleChange = (e) => {
      if (e.matches) {
        desktopState.current = collapsedRef.current; // remember, then force collapse
        setCollapsed(true);
      } else {
        setCollapsed(desktopState.current); // restore on the way back up
      }
    };

    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []); // subscribed once

  return [collapsed, setCollapsed];
}