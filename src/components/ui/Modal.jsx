import { useEffect } from "react";

function Modal({ children, labelledBy, role = "dialog", onClose, className = "" }) {
  useEffect(() => {
    if (!onClose) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose} // clicking the backdrop closes it, if onClose exists
    >
      <div
        role={role}
        aria-modal="true"
        aria-labelledby={labelledBy}
        onClick={(e) => e.stopPropagation()} // clicks inside the card don't close it
        className={`w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-900 dark:text-white ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;