import { useNavigate, useLocation } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
import { FileText, FileSignature, Pencil } from "lucide-react";
import { Toolbar, ToolButton } from "../ui/Toolbar";

const buttonUI =
  "inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-2 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 cursor-pointer sm:px-3 dark:bg-transparent dark:outline-1 dark:hover:bg-zinc-400 dark:active:bg-zinc-800";

function ActionButton({ icon: Icon, label, onClick, className = "" }) {
  return (
    <button
      type="button"
      className={`${buttonUI} ${className}`}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function EmployeeDetailToolbar({ onEdit, onPreviewCoe, onViewContract }) {
  const navigate = useNavigate();
  const { search } = useLocation();

  return (
    <Toolbar
      left={
        <>
          <ToolButton
            icon={<BsArrowLeft />}
            label="Back to employees"
            onClick={() => navigate({ pathname: "/employee", search })}
          />

          <span className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-700" />

          <ActionButton icon={FileText} label="Generate COE" onClick={onPreviewCoe} />
          <ActionButton icon={FileSignature} label="View Contract" onClick={onViewContract} />
        </>
      }
      right={
        <ActionButton
          icon={Pencil}
          label="Edit Employee Details"
          onClick={onEdit}
          className="mr-4"
        />
      }
    />
  );
}

export default EmployeeDetailToolbar;