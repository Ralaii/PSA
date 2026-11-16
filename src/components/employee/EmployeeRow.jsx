import EmployeeAvatar from "./EmployeeAvatar";
import EmployeeRowActions from "./EmployeeRowActions";

const td = "px-4 py-3 text-sm text-zinc-600 dark:text-zinc-300";
const stop = (ev) => ev.stopPropagation();

function EmployeeRow({ employee: e, selected, onToggleSelect, onEdit, onDelete, onView }) {
  return (
    <tr
      onClick={() => onView?.(e)}
      className={`group cursor-pointer transition-colors hover:bg-blue-100 dark:hover:bg-zinc-800 ${
        selected ? "bg-blue-50 dark:bg-zinc-800/60" : ""
      }`}
    >
      <td
        onClick={stop}
        className="w-10 border-l-2 border-transparent py-3 pl-4 pr-0 group-hover:border-blue-600 dark:group-hover:border-blue-400"
      >
        <input
          type="checkbox"
          aria-label={`Select ${e.name}`}
          checked={selected}
          onChange={() => onToggleSelect(e.id)}
          className="size-4 cursor-pointer"
        />
      </td>

      <td className={`${td} whitespace-nowrap font-mono`}>{e.employeeNumber}</td>

      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <EmployeeAvatar id={e.id} name={e.name} />
          <span className="whitespace-nowrap text-sm text-zinc-700 dark:text-zinc-200">
            {e.name}
          </span>
        </div>
      </td>

      <td className={`${td} whitespace-nowrap`}>{e.position}</td>

      <td className={td}>{e.department}</td>

      <td className={td}>
        <a
          href={`mailto:${e.email}`}
          onClick={stop}
          className="text-blue-700 hover:underline dark:text-blue-400"
        >
          {e.email}
        </a>
      </td>

      <td className={`${td} whitespace-nowrap`}>{e.mobile}</td>

      <td onClick={stop} className="px-4 py-3">
        <EmployeeRowActions
          employee={e}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
        />
      </td>
    </tr>
  );
}

export default EmployeeRow;