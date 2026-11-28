import { Link } from "react-router";

function CellLink({ to, children, className = "", focusable = false }) {
  return (
    <Link
      to={to}
      tabIndex={focusable ? undefined : -1}
      className={`block px-4 py-3 ${className}`}
    >
      {children}
    </Link>
  );
}

export default CellLink;