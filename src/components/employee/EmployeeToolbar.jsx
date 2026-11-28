import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FileText, FileSignature, Pencil, Plus } from "lucide-react";
import SelectAllCheckbox from "../ui/SelectAllCheckBox";
import { Toolbar, ToolButton } from "../ui/Toolbar";
import ActionButton from "../ui/ActionButton";

function EmployeeToolbar({
  pager,
  onPrev,
  onNext,
  allSelected,
  someSelected,
  selectedCount,
  canSelect,
  onToggleAll,
  onPreviewCoe,
  onEdit,
  onAdd,
}) {
  const singleSelected = selectedCount === 1;

  return (
    <Toolbar
      left={
        <>
          <SelectAllCheckbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={onToggleAll}
            disabled={!canSelect}
          />

          <span className="mx-1 h-5 w-px bg-zinc-200 dark:bg-zinc-700" />

          {singleSelected && (
            <>
              <ActionButton icon={Pencil} label="Edit Employee" onClick={onEdit} />
              <ActionButton icon={FileText} label="Generate COE" onClick={onPreviewCoe} />
            </>
          )}
          {selectedCount >= 1 && (
            <ActionButton icon={FileSignature} label="View Contract" />
          )}
        </>
      }
      right={
        pager && (
          <>
            <ActionButton icon={Plus} label="Add New Employee" onClick={onAdd} />

            <span className="hidden px-2 text-xs text-zinc-500 sm:inline">
              {pager.start + 1} - {pager.end} of {pager.total}
            </span>
            <ToolButton icon={<BsChevronLeft />} label="Newer" onClick={onPrev} disabled={!pager.hasPrev} />
            <ToolButton icon={<BsChevronRight />} label="Older" onClick={onNext} disabled={!pager.hasNext} />
          </>
        )
      }
    />
  );
}

export default EmployeeToolbar;