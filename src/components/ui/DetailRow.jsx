function DetailRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-6 py-2.5">
      <dt className="shrink-0 text-sm text-zinc-500 dark:text-zinc-400">{label}</dt>
      <dd className="min-w-0 break-words text-right text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {value || "—"}
      </dd>
    </div>
  );
}

export default DetailRow;