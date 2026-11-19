import { useState, useEffect, useRef } from "react";

export function usePagination(
  list, 
  pageSize, 
  { resetKey, onPageChange, serverTotal, page: controlledPage, setPage: setControlledPage } = {}) {
  const [innerPage, setInnerPage] = useState(0);
  const page = controlledPage ?? innerPage;
  const setPage = setControlledPage ?? setInnerPage;
  const isServer = serverTotal != null;

  const total = isServer ? serverTotal : list.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages -1);
  const start = currentPage * pageSize;
  const end = Math.min(start + pageSize, total);

  // Reset to first page when resetKey changes (e.g. filters), skipping first render
  const prevKey = useRef(resetKey);
  useEffect(() => {
    if (prevKey.current !== resetKey) {
      prevKey.current = resetKey;
      setPage(0);
      onPageChange?.();
    }
  }, [resetKey, onPageChange, setPage]);

  const goTo = (p) => {
    setPage(p);
    onPageChange?.();
  };

  return {
    pageItems: isServer ? list : list.slice(start, end),
    page: currentPage,
    totalPages,
    start,
    end,
    rangeStart: total === 0 ? 0 : start + 1,
    hasPrev: currentPage > 0,
    hasNext: currentPage < totalPages - 1,
    next: () => goTo(currentPage + 1),
    prev: () => goTo(currentPage - 1),
    reset: () => goTo(0)
  };
}