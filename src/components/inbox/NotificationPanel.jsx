import { useState } from "react";
import NotificationItem from "./NotificationItem";
import MarkAllReadButton from "./MarkAllReadButton";

function NotificationPanel({ items, unreadCount, isPending, onRead, onMarkAllRead, onViewAll }) {
  const [tab, setTab] = useState("all");
  const visible = tab === "unread" ? items.filter((n) => !n.read) : items;

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="font-semibold">Notifications</h2>
        <MarkAllReadButton onClick={onMarkAllRead} disabled={unreadCount === 0} />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-zinc-200 px-4 dark:border-zinc-700">
        {["all", "unread"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`-mb-px cursor-pointer border-b-2 pb-2 text-sm capitalize ${
              tab === t
                ? "border-blue-600 font-medium text-blue-600 dark:border-blue-400 dark:text-blue-400"
                : "border-transparent text-zinc-500"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <ul className="max-h-96 overflow-y-auto">
        {visible.length === 0 ? (
          <li className="px-4 py-10 text-center text-sm text-zinc-500">
            {isPending ? "Loading…" : "You're all caught up."}
          </li>
        ) : (
          visible.map((n) => (
            <NotificationItem key={n.id} notification={n} compact onRead={onRead} />
          ))
        )}
      </ul>

      {/* Footer */}
      <div className="border-t border-zinc-200 p-2 text-center dark:border-zinc-700">
        <button
          onClick={onViewAll}
          className="cursor-pointer text-sm text-blue-600 hover:underline dark:text-blue-400"
        >
          View all notifications
        </button>
      </div>
    </>
  );
}

export default NotificationPanel;