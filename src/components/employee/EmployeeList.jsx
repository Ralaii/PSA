import EmployeeRow from "./EmployeeRow";

const th =
  "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-600 dark:text-zinc-400";

function EmployeeList({
  items,
  isPending,
  isError,
  selected,
  onToggleSelect,
  onEdit,
  onDelete,
  onView,
}) {
  if (isPending) {
    return <p className="py-10 text-center text-sm text-zinc-500">Loading employees...</p>;
  }
  if (isError) {
    return <p className="py-10 text-center text-sm text-red-500">Failed to load employees.</p>;
  }
  if (items.length === 0) {
    return <p className="py-10 text-center text-sm text-zinc-500">No employees found.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <table className="w-full min-w-3xl border-collapse">
        <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800">
          <tr>
            <th></th>
            <th className={th}>Employee No.</th>
            <th className={th}>Name</th>
            <th className={th}>Position</th>
            <th className={th}>Department</th>
            <th className={th}>Email</th>
            <th className={th}>Mobile</th>
            <th className={th}>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {items.map((e) => (
            <EmployeeRow
              key={e.id}
              employee={e}
              selected={selected.has(e.id)}
              onToggleSelect={onToggleSelect}
              onEdit={onEdit}
              onDelete={onDelete}
              onView={onView}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeList;