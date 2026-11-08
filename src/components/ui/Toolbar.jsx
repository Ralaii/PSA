export const toolBtn =
  "flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-lg text-zinc-600 transition hover:bg-zinc-300 disabled:cursor-default disabled:opacity-40 dark:text-zinc-300 dark:hover:bg-zinc-800";

export function ToolButton({ icon, label, ...props }) {
  return (
    <button
      className={toolBtn}
      aria-label={label}
      title={label}
      {...props}
    >
      {icon}
    </button>
  );
}

export function Toolbar({ left, right }) {
  return (
    <div className="sticky z-10 flex h-16 items-center justify-between gap-2 bg-zinc-100 px-3 sm:-top-6 sm:-mx-6 sm:-mt-6 sm:px-6 dark:border-zinc-700 dark:bg-zinc-900">
      <div className="flex items-center gap-2">{left}</div>
      <div className="flex items-center gap-1">{right}</div>
    </div>
  );
}