import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import SelectAllCheckbox from "../ui/SelectAllCheckBox";
import { Toolbar, ToolButton } from "../ui/Toolbar";

function EmployeeToolbar({
  pager,
  onPrev,
  onNext,
  allSelected,
  someSelected,
  canSelect,
  onToggleAll,
}) {
  return (
    <Toolbar
      left={
          <SelectAllCheckbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={onToggleAll}
            disabled={!canSelect}
          />
      }
      right={
        pager && (
          <>
            <span className="px-2 text-xs text-zinc-500">
              {pager.start + 1} - {pager.end} of {pager.total}
            </span>
            <ToolButton icon={<BsChevronLeft/>} label="Newer" onClick={onPrev} disabled={!pager.hasPrev}/>
            <ToolButton icon={<BsChevronRight/>} label="Older" onClick={onNext} disabled={!pager.hasNext}/>
          </>
        )
      }
    />
  )
}

export default EmployeeToolbar;