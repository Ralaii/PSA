import { typeMeta } from "./notificationMeta";

const chip = (active) =>
  `shrink-0 whitespace-nowrap cursor-pointer rounded-full border px-3 py-1 text-sm transition ${
    active
      ? "border-blue-600 bg-blue-600 text-white"
      : "border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
  }`;

function NotificationFilters({ tab, onTabChange, type, onTypeChange, unreadCount }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {["all", "unread"].map((t) => (
        <button key={t} onClick={() => onTabChange(t)} className={chip(tab === t)}>
          <span className="capitalize">{t}</span>
          {t === "unread" && unreadCount > 0 && ` (${unreadCount})`}
        </button>
      ))}

      <span className="mx-1 h-5 w-px shrink-0 bg-zinc-300 dark:bg-zinc-700" />

      {["all", ...Object.keys(typeMeta)].map((t) => (
        <button key={t} onClick={() => onTypeChange(t)} className={chip(type === t)}>
          {t === "all" ? "All types" : typeMeta[t].label}
        </button>
      ))}
    </div>
  );
}

export default NotificationFilters;