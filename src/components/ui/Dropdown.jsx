import { useEffect, useRef, useState } from "react";

function Dropdown({ trigger, children, panelClassName = "sm:w-96" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={ref} className="relative">
      {trigger({ open, toggle: () => setOpen((prev) => !prev) })}

      {open && (
        <div
          className={`fixed inset-x-3 top-[4.5rem] z-50 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 dark:border-zinc-700 dark:bg-zinc-900 ${panelClassName}`}
        >
          {typeof children === "function" ? children({ close }) : children}
        </div>
      )}
    </div>
  );
}

export default Dropdown;