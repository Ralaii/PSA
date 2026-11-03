import NotificationItem from "./NotificationItem";

function StatusRow({ children, className = "text-zinc-500" }) {
  return <li className={`px-4 py-12 text-center text-sm ${className}`}>{children}</li>;
}

function NotificationList({
  items,
  isPending,
  isError,
  selected,
  onToggleSelect,
  onRead,
  onToggleRead,
  onDelete,
}) {
  let content;

  if (isPending) content = <StatusRow>Loading…</StatusRow>;
  else if (isError) content = <StatusRow className="text-red-500">Failed to load notifications.</StatusRow>;
  else if (items.length === 0) content = <StatusRow>No notifications found.</StatusRow>;
  else
    content = items.map((n) => (
      <NotificationItem
        key={n.id}
        notification={n}
        selected={selected.has(n.id)}
        onToggleSelect={onToggleSelect}
        onRead={onRead}
        onToggleRead={onToggleRead}
        onDelete={onDelete}
      />
    ));

  return (
    <ul className="divide-y divide-zinc-200 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:divide-zinc-700 dark:border-zinc-700 dark:bg-zinc-900">
      {content}
    </ul>
  );
}

export default NotificationList;