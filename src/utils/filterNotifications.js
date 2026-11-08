export function filterNotifications(items, tab, type, keepId, q = "") {
  const term = q.trim().toLowerCase();

  return items
    .filter(
      (n) =>
        (tab === "all" || !n.read || String(n.id) === String(keepId)) &&
        (type === "all" || n.type === type) &&
        (!term || `${n.title ?? ""} ${n.text ?? ""}`.toLowerCase().includes(term))
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}