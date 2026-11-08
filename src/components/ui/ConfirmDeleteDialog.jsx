import { useEffect } from "react";

function ConfirmDeleteDialog({ notification, count = 0, pending = false, onConfirm, onCancel }) {
  const isBulk = !notification && count > 0;
  const open = Boolean(notification) || isBulk;

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && !pending && onCancel();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, pending, onCancel]);

  if (!open) return null;

  const title = isBulk
    ? `Delete ${count} inbox${count > 1 ? "s" : ""}?`
    : "Delete Inbox?";

  const message = isBulk
    ? `${count > 1 ? "These inboxes" : "This inbox"} will be permanently removed. This can't be undone.`
    : `"${notification.title}" will be permanently removed. This can't be undone.`;

  return (
    <div
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget && !pending) onCancel();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-title"
        className="w-full max-w-sm rounded-xl border border-zinc-200 bg-white p-5 shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
      >
        <h2 id="delete-title" className="text-lg font-semibold">
          {title}
        </h2>
        <p className="mt-2 text-sm text-zinc-500">{message}</p>

        <div className="mt-5 flex justify-end gap-2">
          <button
            onClick={onCancel}
            disabled={pending}
            autoFocus
            className="cursor-pointer rounded-lg border border-zinc-300 px-4 py-2 text-sm transition hover:bg-zinc-100 disabled:cursor-default disabled:opacity-60 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(notification?.id)}
            disabled={pending}
            className="cursor-pointer rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-gray-700 disabled:cursor-default disabled:opacity-60 dark:bg-gray-600"
          >
            {pending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteDialog;