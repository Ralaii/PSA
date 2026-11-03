import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import NotificationFilters from "../components/inbox/NotificationFilters";
import NotificationList from "../components/inbox/NotificationList";
import InboxToolbar from "../components/inbox/InboxToolbar";
import ConfirmDeleteDialogue from "../components/ui/ConfirmDeleteDialog";
import { useSelection } from "../hooks/useSelection";
import { usePagination } from "../hooks/usePagination";
import { useNotifications } from "../hooks/useNotification";
import { useInboxActions } from "../hooks/useInboxActions";
import { filterNotifications } from "../utils/filterNotifications";

const PAGE_SIZE = 25;

function Inbox() {
  const { data: items = [], isPending, isError } = useNotifications();
  const actions = useInboxActions();

  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") ?? "all";
  const type = searchParams.get("type") ?? "all";
  const [pendingDelete, setPendingDelete] = useState(null);
  const [confirmBulk, setConfirmBulk] = useState(false);

  const selection = useSelection();

  const filtered = useMemo(
    () => filterNotifications(items, tab, type),
    [items, tab, type]
  );

  const pager = usePagination(filtered, PAGE_SIZE);
  const visible = pager.pageItems;

  const unreadCount = items.filter(
    (n) => !n.read && (type === "all" || n.type === type)
  ).length;

  const selectedItems = items.filter((n) => selection.selected.has(n.id));
  const allSelected = visible.length > 0 && visible.every((n) => selection.selected.has(n.id));
  const someSelected = selection.size > 0 && !allSelected;

  // ---- Handlers ----
  const toggleAll = () =>
    allSelected ? selection.clear() : selection.setAll(visible.map((n) => n.id));

  const changePage = (action) => () => {
    action();
    selection.clear();
  };

  const changeFilter = (key) => (value) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value === "all") next.delete(key);
        else next.set(key, value);
        return next;
      },
      { replace: true }
    );
    pager.reset();
    selection.clear();
  };

  // markAsRead = true  -> mark the selected unread items as read
  // markAsRead = false -> mark the selected read items as unread
  const bulkMark = (markAsRead) => () => {
    const ids = selectedItems.filter((n) => n.read !== markAsRead).map((n) => n.id);
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
        onPrev={changePage(pager.prev)}
        onNext={changePage(pager.next)}
      />

      <div className="mx-auto max-w-4xl space-y-4 pt-6">
        <NotificationFilters
          tab={tab}
          type={type}
          unreadCount={unreadCount}
          onTabChange={changeFilter("tab")}
          onTypeChange={changeFilter("type")}
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

        <ConfirmDeleteDialogue
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