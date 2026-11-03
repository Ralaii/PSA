import { BsBell } from "react-icons/bs";
import { useNavigate } from "react-router";
import Dropdown from "../ui/Dropdown";
import NotificationPanel from "./NotificationPanel";
import { useNotifications, useMarkRead, useMarkAllRead } from "../../hooks/useNotification";

function NotificationDropdown() {
  const navigate = useNavigate();

  const { data: items = [], isPending } = useNotifications();
  const markReadMutation = useMarkRead();
  const markAllReadMutation = useMarkAllRead();

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <Dropdown
      trigger={({ open, toggle }) => (
        <button
          type="button"
          aria-label="Notifications"
          aria-expanded={open}
          onClick={toggle}
          className="relative flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-lg text-zinc-900 transition hover:bg-zinc-300 dark:text-zinc-100 dark:hover:bg-zinc-800"
        >
          <BsBell />
          {unreadCount > 0 && (
            <span className="absolute right-0.5 top-0.5 flex min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium leading-4 text-white">
              {unreadCount}
            </span>
          )}
        </button>
      )}
    >
      {({ close }) => (
        <NotificationPanel
          items={items}
          unreadCount={unreadCount}
          isPending={isPending}
          onRead={markReadMutation.mutate}
          onMarkAllRead={() => markAllReadMutation.mutate()}
          onViewAll={() => {
            close();
            navigate("/inbox");
          }}
        />
      )}
    </Dropdown>
  );
}

export default NotificationDropdown;