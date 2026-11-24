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
        <>
          <SelectAllCheckbox
            checked={allSelected}
            indeterminate={someSelected}
            onChange={onToggleAll}
            disabled={!canSelect}
          />
          {someSelected > 0 && (
            <>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 cursor-pointer dark:bg-transparent dark:outline-1 dark:hover:bg-zinc-400 dark:active:bg-zinc-800"
              >
                Preview COE
              </button>

              <button 
                type="button"
                className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 cursor-pointer dark:bg-transparent dark:outline-1 dark:hover:bg-zinc-400 dark:active:bg-zinc-800"
              >
                Download COE
              </button>
          </>
          )}
          {allSelected && (
            <button 
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 active:bg-blue-800 cursor-pointer dark:bg-transparent dark:outline-1 dark:hover:bg-zinc-400 dark:active:bg-zinc-800"
            >
              Download COE
            </button>
          )}
        </>
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