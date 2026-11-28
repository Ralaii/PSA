const buttonUI =
  "inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-2 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 cursor-pointer sm:px-3 dark:bg-transparent dark:outline-1 dark:hover:bg-zinc-400 dark:active:bg-zinc-800";

function ActionButton({ icon: Icon, label, onClick, className = "", ...props }) {
  return (
    <button
      type="button"
      className={`${buttonUI} ${className}`}
      onClick={onClick}
      aria-label={label}
      title={label}
      {...props}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

export default ActionButton;