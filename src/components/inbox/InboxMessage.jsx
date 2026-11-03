import { typeMeta, fallbackMeta } from "./notificationMeta";
import { timeAgo } from "../../utils/timeAgo";

function InboxMessage({ notification, isLoading, isError }) {
  if (isLoading) {
    return <p className="px-6 py-8 text-zinc-500">Loading...</p>;
  }

  if (isError || !notification) {
    return <p className="px-6 py-8 text-zinc-500">Notification not found.</p>;
  }

  const meta = typeMeta[notification.type] ?? fallbackMeta;

  return (
    <div className="px-4 py-6 sm:px-6">
      {/* Subject */}
      <h1 className="text-xl font-normal sm:text-2xl">{notification.title}</h1>

      {/* Sender row */}
      <div className="mt-5 flex items-start gap-3 sm:gap-4">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-lg text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
          {meta.icon}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{meta.label}</p>
          <p className="text-xs text-zinc-500">to me</p>
        </div>

        <p className="shrink-0 text-xs text-zinc-500">
          {timeAgo(notification.createdAt)}
        </p>
      </div>

      {/* Body, indented to line up with the sender name like Gmail */}
      <div className="mt-4 sm:ml-14">
        <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-800 dark:text-zinc-200">
          {notification.text}
        </p>
      </div>
    </div>
  );
}

export default InboxMessage;