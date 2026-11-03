import {
  BsTrash,
  BsEnvelope,
  BsEnvelopeOpen,
  BsChevronLeft,
  BsChevronRight,
  BsLink45Deg,
} from "react-icons/bs";
import SelectAllCheckbox from "../ui/SelectAllCheckBox";
import { Toolbar, ToolButton } from "../ui/Toolbar";

function InboxToolbar({
  allSelected,
  someSelected,
  selectedCount,
  canSelect,
  hasUnreadSelected,
  hasReadSelected,
  onToggleAll,
  onMarkRead,
  onMarkUnread,
  onDelete,
  pager,
  onPrev,
  onNext,
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
          {selectedCount > 0 && (
            <>
              {hasUnreadSelected && (
                <ToolButton icon={<BsEnvelopeOpen />} label="Mark selected as read" onClick={onMarkRead} />
              )}
              {hasReadSelected && (
                <ToolButton icon={<BsEnvelope />} label="Mark selected as unread" onClick={onMarkUnread} />
              )}
              <ToolButton icon={<BsTrash />} label="Delete selected" onClick={onDelete} />
              <ToolButton icon={<BsLink45Deg />} label="Setting"/>
            </>
          )}
        </>
      }
      right={
        pager.total > 0 && (
          <>
            <span className="px-2 text-xs text-zinc-500">
              {pager.start + 1}-{pager.end} of {pager.total}
            </span>
            <ToolButton icon={<BsChevronLeft />} label="Newer" onClick={onPrev} disabled={!pager.hasPrev} />
            <ToolButton icon={<BsChevronRight />} label="Older" onClick={onNext} disabled={!pager.hasNext} />
          </>
        )
      }
    />
  );
}

export default InboxToolbar;