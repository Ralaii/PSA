import { BsArrowDown, BsArrowDownUp, BsArrowUp } from "react-icons/bs";

function SortButton({ label, dir, onClick }) {
  const Icon = dir === "asc" ? BsArrowUp : dir === "desc" ? BsArrowDown : BsArrowDownUp;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Sort by ${label}`}
      className={`flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
        dir ? "text-blue-600 dark:text-blue-400" : "text-zinc-500 dark:text-zinc-400"
      }`}
    >
      {label}
      <Icon className={dir ? "" : "opacity-50"} />
    </button>
  );
}

export default SortButton;