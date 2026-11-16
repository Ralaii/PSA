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
    <div className="sticky -top-3 z-10 -mx-3 -mt-6 flex h-14 items-center justify-between gap-2 bg-zinc-100 pr-2 pl-5 sm:-top-6 sm:-mx-6 sm:-mt-6 dark:bg-zinc-900">
      <div className="flex items-center gap-2">{left}</div>
      <div className="flex items-center gap-1">{right}</div>
    </div>
  );
}