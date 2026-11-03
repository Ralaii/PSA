import { useNavigate, useLocation } from "react-router";
import { BsTrash, BsEnvelopeOpen, BsEnvelope } from "react-icons/bs";
import { typeMeta, fallbackMeta } from "./notificationMeta";
import { timeAgo } from "../../utils/timeAgo";

function NotificationItem({
  notification: n,
  onRead,
  onDelete,
  onNavigate,
  selected = false,
  onToggleSelect,
  onToggleRead,
  compact = false,
}) {
  const navigate = useNavigate();
  const meta = typeMeta[n.type] ?? fallbackMeta;
  const { pathname, search } = useLocation();

  const handleClick = () => {
    if (!n.read) onRead(n.id);
    navigate({
      pathname: `/inbox/${n.id}`,
      search: pathname === "/inbox" ? search : "",
    });
    onNavigate?.();
  };

  return (
    <li
      className={`group flex items-center gap-2 px-3 py-3 transition sm:gap-3 sm:px-4 ${
        selected
          ? "bg-blue-100 dark:bg-blue-500/15"
          : n.read
            ? "bg-slate-100/70 hover:bg-slate-100 dark:bg-zinc-900/70 dark:hover:bg-zinc-900"
            : "bg-white hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900"
      }`}
    >
      {/* Checkbox is a sibling of the row button, never inside it */}
      {onToggleSelect && (
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(n.id)}
          aria-label={`Select "${n.title}"`}
          className="size-4 shrink-0 cursor-pointer accent-blue-600 dark:[color-scheme:dark]"
        />
      )}

      <button
        onClick={handleClick}
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 text-left"
      >
        {/* Icon only when there's no checkbox (e.g. the topbar dropdown) */}
        {!onToggleSelect && (
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            {meta.icon}
          </span>
        )}

        <span className="min-w-0 flex-1">
          <span
            className={`block truncate text-sm ${
              n.read ? "text-zinc-600 dark:text-zinc-400" : "font-semibold"
            }`}
          >
            {n.title}
          </span>
          <span
            className={`block text-sm text-zinc-500 ${
              compact ? "truncate" : "line-clamp-1 sm:line-clamp-2"
            }`}
          >
            {n.text}
          </span>
          <span className="mt-0.5 block text-xs text-zinc-400">{timeAgo(n.createdAt)}</span>
        </span>

        {!n.read && <span className="size-2 shrink-0 rounded-full bg-blue-600" />}
      </button>

      {onToggleRead && (
        <button
          onClick={() => onToggleRead(n)}
          aria-label="Mark as read"
          className="shrink-0 cursor-pointer rounded-full p-2 text-zinc-400 transition hover:bg-zinc-200 hover:text-blue-600 sm:opacity-0 sm:group-hover:opacity-100 dark:hover:bg-zinc-700"
        >
          {n.read ? <BsEnvelope /> : <BsEnvelopeOpen />}
        </button>
      )}


      {onDelete && (
        <button
          onClick={() => onDelete(n)}
          aria-label="Delete notification"
          className="shrink-0 cursor-pointer rounded-full p-2 text-zinc-400 transition hover:bg-zinc-200 hover:text-red-500 sm:opacity-0 sm:group-hover:opacity-100 dark:hover:bg-zinc-700"
        >
          <BsTrash />
        </button>
      )}
    </li>
  );
}

export default NotificationItem;