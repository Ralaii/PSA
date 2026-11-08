import { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import GlobalSearchResults from "./GlobalSearchResults";

function TopbarSearchInput({ search, className = "", inputClassName = "", autoFocus }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
      <input
        type="text"
        value={search.text}
        onChange={(e) => {
          search.setText(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder={search.placeholder}
        disabled={!search.enabled}
        autoFocus={autoFocus}
        className={inputClassName}
      />

      {search.mode === "global" && open && (
        <GlobalSearchResults
          query={search.debounced}
          onSelect={() => {
            setOpen(false);
            search.setText("");
          }}
        />
      )}
    </div>
  );
}

export default TopbarSearchInput;