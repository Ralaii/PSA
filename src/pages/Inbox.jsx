import { useMemo, useState } from "react";
import NotificationFilters from "../components/inbox/NotificationFilters";
import NotificationList from "../components/inbox/NotificationList";
import InboxToolbar from "../components/inbox/InboxToolbar";
import ConfirmDeleteDialog from "../components/ui/ConfirmDeleteDialog";
import { useSelection } from "../hooks/useSelection";
import { usePagination } from "../hooks/usePagination";
import { useQueryParams } from "../hooks/useQueryParams";
import { useNotifications } from "../hooks/useNotification";
import { useInboxActions } from "../hooks/useInboxActions";
import { filterNotifications } from "../utils/filterNotifications";

const PAGE_SIZE = 25;
const FILTER_DEFAULTS = { tab: "all", type: "all", q: "" };

function Inbox() {
  const { data: items = [], isPending, isError } = useNotifications();
  const actions = useInboxActions();

  const { values, set, resetKey } = useQueryParams(FILTER_DEFAULTS);
  const { tab, type, q } = values;

  const [pendingDelete, setPendingDelete] = useState(null);
  const [confirmBulk, setConfirmBulk] = useState(false);

  const selection = useSelection();

 const filtered = useMemo(
    () => filterNotifications(items, tab, type, undefined, q),
    [items, tab, type, q]
  );

  // Resets to page 0 when tab/type/q change, and clears the selection on every page change (next, prev, reset, filter change).
  const pager = usePagination(filtered, PAGE_SIZE, {
    resetKey,
    onPageChange: selection.clear,
  });
  const visible = pager.pageItems;

  const unreadCount = items.filter(
    (n) => !n.read && (type === "all" || n.type === type)
  ).length;

  const selectedItems = items.filter((n) => selection.selected.has(n.id));
  const allSelected =
    visible.length > 0 && visible.every((n) => selection.selected.has(n.id));
  const someSelected = selection.size > 0 && !allSelected;

  // ---- Handlers ----
  const toggleAll = () =>
    allSelected ? selection.clear() : selection.setAll(visible.map((n) => n.id));

  // markAsRead = true  -> mark the selected unread items as read
  // markAsRead = false -> mark the selected read items as unread
  const bulkMark = (markAsRead) => () => {
    const ids = selectedItems
      .filter((n) => n.read !== markAsRead)
      .map((n) => n.id);
    if (ids.length === 0) return;
    actions.markMany(markAsRead, ids);
    selection.clear();
  };

  const confirmDelete = (id) => {
    if (!id) return;
    actions.remove(id);
    selection.remove(id);
    setPendingDelete(null);
  };

  const bulkDelete = () => {
    actions.removeMany([...selection.selected]);
    selection.clear();
    setConfirmBulk(false);
  };

  const cancelDelete = () => {
    setPendingDelete(null);
    setConfirmBulk(false);
  };

  return (
    <div>
      <InboxToolbar
        allSelected={allSelected}
        someSelected={someSelected}
        selectedCount={selection.size}
        canSelect={filtered.length > 0}
        hasUnreadSelected={selectedItems.some((n) => !n.read)}
        hasReadSelected={selectedItems.some((n) => n.read)}
        onToggleAll={toggleAll}
        onMarkRead={bulkMark(true)}
        onMarkUnread={bulkMark(false)}
        onDelete={() => setConfirmBulk(true)}
        pager={pager}
        onPrev={pager.prev}
        onNext={pager.next}
      />

      <div className="mx-auto max-w-4xl space-y-4 pt-6">
        <NotificationFilters
          tab={tab}
          type={type}
          unreadCount={unreadCount}
          onTabChange={(v) => set("tab", v)}
          onTypeChange={(v) => set("type", v)}
        />

        <NotificationList
          items={visible}
          isPending={isPending}
          isError={isError}
          selected={selection.selected}
          onToggleSelect={selection.toggle}
          onRead={actions.markRead}
          onToggleRead={actions.toggleRead}
          onDelete={setPendingDelete}
        />

        <ConfirmDeleteDialog
          notification={pendingDelete}
          count={confirmBulk ? selection.size : 0}
          pending={actions.isDeleting}
          onConfirm={confirmBulk ? bulkDelete : confirmDelete}
          onCancel={cancelDelete}
        />
      </div>
    </div>
  );
}

export default Inbox;