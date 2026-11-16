import { useMemo } from "react";
import { keepPreviousData, useQueries } from "@tanstack/react-query";
import { searchSources } from "../../config/searchSources";

const MAX_RESULTS = 5;
const MIN_CHARS = 2;

export function useGlobalSearch(query = "") {
  const term = query.trim().toLowerCase();
  const enabled = term.length >= MIN_CHARS;

  const results = useQueries({
    queries: searchSources.map((s) => ({
      queryKey: ["global-search", s.key, term],
      queryFn: () => s.search(term),
      enabled,
      staleTime: 30_000,
      placeholderData: keepPreviousData, // keeps old results while typing
    })),
  });

  const groups = useMemo(() => {
    if (!enabled) return [];

    const out = [];
    let remaining = MAX_RESULTS;

    searchSources.forEach((s, i) => {
      if (remaining <= 0) return;
      const data = results[i].data ?? [];
      const items = data.slice(0, remaining);
      if (items.length === 0) return;
      remaining -= items.length;
      out.push({ source: s, items, total: data.length });
    });

    return out;
  }, [enabled, ...results.map((r) => r.data)]);

  const isLoading = enabled && results.some((r) => r.isLoading);

  return { groups, isLoading, term: enabled ? term : "" };
}