import { useNavigate, useLocation } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
import { FileText, FileSignature, Pencil } from "lucide-react";
import { Toolbar, ToolButton } from "../ui/Toolbar";
import ActionButton from "../ui/ActionButton";

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