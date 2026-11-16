import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  BsPencil,
  BsInfoCircle,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { IoMdDownload } from "react-icons/io";

const MENU_HEIGHT = 130;

const itemClass =
  "flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800";

function EmployeeRowActions({ employee, onEdit, onDelete, onView }) {
  const [pos, setPos] = useState(null); // null = closed
  const btnRef = useRef(null);
  const menuRef = useRef(null);
  const open = pos !== null;

  const close = () => setPos(null);

  const toggle = () => {
    if (open) return close();
    const r = btnRef.current.getBoundingClientRect();
    const flip = r.bottom + MENU_HEIGHT > window.innerHeight;
    setPos({
      top: flip ? r.top - MENU_HEIGHT - 4 : r.bottom + 4,
      right: window.innerWidth - r.right,
    });
  };

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (btnRef.current?.contains(e.target)) return;
      if (menuRef.current?.contains(e.target)) return;
      close();
    };
    const onKey = (e) => e.key === "Escape" && close();

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [open]);

  const run = (fn) => () => {
    close();
    fn?.(employee);
  };

  return (
    <div className="flex justify-center">
      <button
        ref={btnRef}
        type="button"
        aria-label="Actions"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={toggle}
        className="flex size-8 cursor-pointer items-center justify-center rounded-full text-zinc-500 transition hover:bg-zinc-300 dark:hover:bg-zinc-700"
      >
        <BsThreeDotsVertical />
      </button>

      {open &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{ top: pos.top, right: pos.right }}
            className="fixed z-50 w-40 overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
          >
            <button type="button" role="menuitem" className={itemClass} onClick={run(onView)}>
              <BsInfoCircle /> View details
            </button>
            <button type="button" role="menuitem" className={itemClass} onClick={run(onEdit)}>
              <BsPencil /> Edit
            </button>
            <button
              type="button"
              role="menuitem"
              className={`${itemClass} text-red-600 dark:text-red-400`}
              onClick={run(onDelete)}
            >
              <IoMdDownload /> Download COE
            </button>
          </div>,
          document.body
        )}
    </div>
  );
}

export default EmployeeRowActions;