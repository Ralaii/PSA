function InfoStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
        <Icon className="size-[18px]" aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

export default InfoStat;