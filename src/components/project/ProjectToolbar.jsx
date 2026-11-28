import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { Toolbar, ToolButton } from "../ui/Toolbar";
import ActionButton from "../ui/ActionButton";
import { Plus } from "lucide-react";

function ProjectToolbar({ pager, onPrev, onNext, disabled = false }) {
  return (
    <Toolbar
      right={
        pager && (
          <>
          <ActionButton 
            icon={Plus} 
            label="Add New Project"
          />
            <span className="hidden px-2 text-xs text-zinc-500 sm:inline">
              {pager.rangeStart} - {pager.end} of {pager.total}
            </span>
            <ToolButton
              icon={<BsChevronLeft />}
              label="Newer"
              onClick={onPrev}
              disabled={!pager.hasPrev || disabled}
            />
            <ToolButton
              icon={<BsChevronRight />}
              label="Older"
              onClick={onNext}
              disabled={!pager.hasNext || disabled}
            />
          </>
        )
      }
    />
  );
}

export default ProjectToolbar;