import { useState } from "react";

export function usePagination(list, pageSize) {
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(list.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1); // clamps if deletions shrink the list
  const start = currentPage * pageSize;

  return {
    pageItems: list.slice(start, start + pageSize),
    total: list.length,
    start,
    end: Math.min(start + pageSize, list.length),
    hasPrev: currentPage > 0,
    hasNext: currentPage < totalPages - 1,
    next: () => setPage(currentPage + 1),
    prev: () => setPage(currentPage - 1),
    reset: () => setPage(0),
  };
}