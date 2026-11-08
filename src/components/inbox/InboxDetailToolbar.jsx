import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import {
  BsArrowLeft,
  BsTrash,
  BsEnvelope,
  BsEnvelopeOpen,
  BsThreeDotsVertical,
  BsLink45Deg,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { Toolbar, ToolButton, toolBtn } from "../ui/Toolbar";


function InboxDetailToolbar({
  notification,
  togglePending,
  onToggleRead,
  onDelete,
  position,
  total,
  onNewer,
  onOlder,
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { search } = useLocation();

  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e) => !menuRef.current?.contains(e.target) && setMenuOpen(false);
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setMenuOpen(false);
  };

  return (
    <Toolbar
      left={
        <>
          <ToolButton
            icon={<BsArrowLeft />}
            label="Back to inbox"
            onClick={() => navigate({ pathname: "/inbox", search })}
          />

          <span className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-700" />

          <ToolButton
            icon={<BsTrash />}
            label="Delete"
            onClick={onDelete}
            disabled={!notification}
          />
          <ToolButton
            icon={notification?.read ? <BsEnvelope /> : <BsEnvelopeOpen />}
            label={notification?.read ? "Mark as unread" : "Mark as read"}
            onClick={onToggleRead}
            disabled={!notification || togglePending}
          />

          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              disabled={!notification}
              aria-label="More"
              aria-expanded={menuOpen}
              title="More"
              className={toolBtn}
            >
              <BsThreeDotsVertical />
            </button>

            {menuOpen && (
              <div className="absolute left-0 top-full z-20 mt-1 w-48 overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
                <button
                  onClick={copyLink}
                  className="flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left text-sm transition hover:bg-zinc-50 dark:hover:bg-zinc-800"
                >
                  <BsLink45Deg className="text-lg" /> Copy link
                </button>
              </div>
            )}
          </div>
        </>
      }
      right={
        position > 0 && (
          <>
            <span className="px-2 text-xs text-zinc-500">
              {position} of {total}
            </span>
            <ToolButton icon={<BsChevronLeft />} label="Newer" onClick={onNewer} disabled={!onNewer} />
            <ToolButton icon={<BsChevronRight />} label="Older" onClick={onOlder} disabled={!onOlder} />
          </>
        )
      }
    />
  );
}

export default InboxDetailToolbar;