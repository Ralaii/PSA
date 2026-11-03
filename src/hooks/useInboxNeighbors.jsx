import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useNotifications } from "./useNotification";
import { filterNotifications } from "../utils/filterNotifications";

export function useInboxNeighbors(id) {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "all";
  const type = searchParams.get("type") ?? "all";

  const { data: items = [] } = useNotifications();

  const sorted = useMemo(
    () => filterNotifications(items, tab, type, id),
    [items, tab, type, id]
  );

  const index = sorted.findIndex((n) => String(n.id) === String(id));

  return {
    position: index + 1,
    total: sorted.length,
    newer: index > 0 ? sorted[index - 1] : null,
    older: index >= 0 && index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}