import { useState } from "react";

export function useSelection() {
  const [selected, setSelected] = useState(() => new Set());

  const clear = () => setSelected(new Set());
  const setAll = (ids) => setSelected(new Set(ids));

  const toggle = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const remove = (id) =>
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });

  return { selected, size: selected.size, clear, setAll, toggle, remove };
}