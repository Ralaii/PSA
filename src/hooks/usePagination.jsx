import { useState, useEffect, useRef } from "react";

export function usePagination(list, pageSize, { resetKey, onPageChange } = {}) {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1); // clamps if deletions shrink the list
  const start = currentPage * pageSize;
  const end = Math.min(start + pageSize, list.length);

  // Reset to first page when resetKey changes (e.g. filters), skipping first render
  const prevKey = useRef(resetKey);
  useEffect(() => {
    if (prevKey.current !== resetKey) {
      prevKey.current = resetKey;
      setPage(0);
      onPageChange?.();
    }
  }, [resetKey, onPageChange]);

  const goTo = (p) => {
    setPage(p);
    onPageChange?.();
  };

  return {
    pageItems: list.slice(start, end),
    total: list.length,
    page: currentPage,
    totalPages,
    start,
    end,
    rangeStart: list.length === 0 ? 0 : start + 1, // 1-based for display
    hasPrev: currentPage > 0,
    hasNext: currentPage < totalPages - 1,
    next: () => goTo(currentPage + 1),
    prev: () => goTo(currentPage - 1),
    reset: () => goTo(0),
  };
}