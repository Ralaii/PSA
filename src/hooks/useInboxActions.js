import { toast } from "sonner";
import {
  useMarkRead,
  useMarkUnread,
  useDeleteNotification,
  useDeleteNotifications,
  useMarkReadMany,
  useMarkUnreadMany,
} from "./useNotification";

const inboxLabel = (n) => `${n} ${n === 1 ? "inbox" : "inboxes"}`;
const onError = (err) => toast.error(err.message);

export function useInboxActions() {
  const markRead = useMarkRead();
  const markUnread = useMarkUnread();
  const remove = useDeleteNotification();
  const markReadMany = useMarkReadMany();
  const markUnreadMany = useMarkUnreadMany();
  const removeMany = useDeleteNotifications();

  return {
    // ---- single ----
    markRead: (id) => markRead.mutate(id, { onError }),

    toggleRead: (n) => (n.read ? markUnread : markRead).mutate(n.id, { onError }),

    remove: (id, { onSuccess } = {}) =>
      remove.mutate(id, {
        onSuccess: () => {
          toast.success("Inbox deleted");
          onSuccess?.();
        },
        onError,
      }),

    // ---- bulk ----
    markMany: (asRead, ids) => (asRead ? markReadMany : markUnreadMany).mutate(ids, { onError }),

    removeMany: (ids, { onSuccess } = {}) =>
      removeMany.mutate(ids, {
        onSuccess: () => {
          toast.success(`${inboxLabel(ids.length)} deleted`);
          onSuccess?.();
        },
        onError,
      }),

    // ---- status flags for the UI ----
    isTogglePending: markRead.isPending || markUnread.isPending,
    isDeleting: remove.isPending || removeMany.isPending,
  };
}