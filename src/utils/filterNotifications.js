export function filterNotifications(items, tab, type, keepId) {
  return items
    .filter(
      (n) =>
        (tab === "all" || !n.read || String(n.id) === String(keepId)) &&
        (type === "all" || n.type === type)
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}