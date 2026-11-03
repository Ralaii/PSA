import { BsCheck2All } from "react-icons/bs";

function MarkAllReadButton({ onClick, disabled, className = "" }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex cursor-pointer items-center gap-1 text-sm text-blue-600 disabled:cursor-default disabled:opacity-40 dark:text-blue-400 ${className}`}
    >
      <BsCheck2All /> Mark all as read
    </button>
  );
}

export default MarkAllReadButton;