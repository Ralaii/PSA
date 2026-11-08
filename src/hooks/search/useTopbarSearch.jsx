import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useQueryParams } from "../useQueryParams";
import {
  searchScopes,
  globalSearchPaths,
  globalPlaceholder,
} from "../../config/searchScopes";

const SEARCH_DEFAULTS = { q: "" };

export function useTopbarSearch(delay = 300) {
  const { pathname } = useLocation();
  const scope = searchScopes.find((s) => s.path === pathname);
  const mode = scope ? "page" : globalSearchPaths.includes(pathname) ? "global" : "none";

  const { values, set } = useQueryParams(SEARCH_DEFAULTS);
  const [text, setText] = useState(values.q);
  const [debounced, setDebounced] = useState("");

  // New page -> page mode shows that page's ?q=, other modes start empty
  useEffect(() => {
    setText(mode === "page" ? values.q : "");
  }, [pathname]);

  // Page mode: input -> URL, debounced
  useEffect(() => {
    if (mode !== "page" || text === values.q) return;
    const t = setTimeout(() => set("q", text), delay);
    return () => clearTimeout(t);
  }, [text, values.q, mode, set, delay]);

  // Global mode: input -> debounced query for the dropdown
  useEffect(() => {
    if (mode !== "global") {
      setDebounced("");
      return;
    }
    const t = setTimeout(() => setDebounced(text.trim()), delay);
    return () => clearTimeout(t);
  }, [text, mode, delay]);

  return {
    mode,
    text,
    setText,
    debounced,
    enabled: mode !== "none",
    placeholder: scope?.placeholder ?? (mode === "global" ? globalPlaceholder : "Search"),
  };
}