import { useNavigate, useLocation } from "react-router";
import { BsArrowLeft } from "react-icons/bs";
import { FileDown, Users, UserPlus, Pencil } from "lucide-react";
import { Toolbar, ToolButton } from "../ui/Toolbar";
import ActionButton from "../ui/ActionButton";

function ProjectDetailToolbar({ onExport, onManageTeam, onAddMember, onEdit }) {
  const navigate = useNavigate();
  const { search } = useLocation();

  return (
    <Toolbar
      left={
        <>
          <ToolButton
            icon={<BsArrowLeft />}
            label="Back to projects"
            onClick={() => navigate({ pathname: "/project", search })}
          />

          <span className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-700" />

          <ActionButton icon={FileDown} label="Export Report" onClick={onExport} />
          <ActionButton icon={Users} label="Manage Team" onClick={onManageTeam} />
          <ActionButton icon={UserPlus} label="Add Member" onClick={onAddMember} />
        </>
      }
      right={
        <ActionButton
          icon={Pencil}
          label="Edit Project Details"
          onClick={onEdit}
          className="mr-4"
        />
      }
    />
  );
}

export default ProjectDetailToolbar;