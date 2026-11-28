import EmployeeRowActions from "./EmployeeRowActions";
import CellLink from "../ui/CellLink";

const cell = "text-sm text-zinc-600 dark:text-zinc-300";

function EmployeeRow({ employee: e, selected, onToggleSelect, onEdit, onDelete, onView, onPreviewCoe, detailEmployee }) {
  const to = detailEmployee(e);

  return (
    <tr
      className={`group transition-colors hover:bg-blue-100 dark:hover:bg-zinc-800 ${
        selected ? "bg-blue-50 dark:bg-zinc-800/60" : ""
      }`}
    >
      <td className="w-10 border-l-2 border-transparent py-3 pl-4 pr-0 group-hover:border-blue-600 dark:group-hover:border-zinc-400">
        <input
          type="checkbox"
          aria-label={`Select ${e.name}`}
          checked={selected}
          onChange={() => onToggleSelect(e.id)}
          className="size-4 cursor-pointer dark:accent-zinc-400"
        />
      </td>

      <td className="whitespace-nowrap p-0">
        <CellLink to={to} className={`${cell} font-mono`}>
          {e.employeeNumber}
        </CellLink>
      </td>

      <td className="whitespace-nowrap p-0">
        <CellLink to={to} focusable className="text-sm text-zinc-700 dark:text-zinc-200">
          {e.name}
        </CellLink>
      </td>

      <td className="whitespace-nowrap p-0">
        <CellLink to={to} className={cell}>{e.position}</CellLink>
      </td>

      <td className="p-0">
        <CellLink to={to} className={cell}>{e.department}</CellLink>
      </td>

      <td className={`px-4 py-3 ${cell}`}>
        <a
          href={`mailto:${e.email}`}
          className="text-blue-700 hover:underline dark:text-blue-400"
        >
          {e.email}
        </a>
      </td>

      <td className="whitespace-nowrap p-0">
        <CellLink to={to} className={cell}>{e.phoneNum}</CellLink>
      </td>

      <td className="px-4 py-3">
        <EmployeeRowActions
          employee={e}
          onEdit={onEdit}
          onDelete={onDelete}
          onView={onView}
          onPreviewCoe={onPreviewCoe}
        />
      </td>
    </tr>
  );
}

export default EmployeeRow;