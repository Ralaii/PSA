import { useState } from "react";

function Spinner({ className = "" }) {
  const [ countFailure, setCountFailure ] = useState(0);
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 ${className}`}
    />
  );
}

export default Spinner;