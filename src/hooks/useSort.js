import { useMemo, useState } from "react";

const compare = (a, b) => {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a ?? "").localeCompare(String(b ?? ""), undefined, {
    numeric: true,
    sensitivity: "base",
  });
};

export function useSort(items, sorters) {
  const [sort, setSort] = useState(null);

  const sorted = useMemo(() => {
    if (!sort) return items;
    const get = sorters[sort.key];
    const sign = sort.dir === "asc" ? 1 : -1;
    return [...items].sort((a, b) => compare(get(a), get(b)) * sign);
  }, [items, sorters, sort]);

  const toggle = (key) =>
    setSort((prev) => {
      if (prev?.key !== key) return { key, dir: "asc" };
      return prev.dir === "asc" ? { key, dir: "desc" } : null;
    });

  return { sorted, sort, toggle };
}