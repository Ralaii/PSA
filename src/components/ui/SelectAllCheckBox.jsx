import { useEffect, useRef } from "react";

function SelectAllCheckbox({ checked, indeterminate, onChange, disabled }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      disabled={disabled}
      aria-label="Select all"
      className="size-4 cursor-pointer accent-blue-600"
    />
  );
}

export default SelectAllCheckbox;