import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SectionCard from "../ui/SectionCard";
import DetailRow from "../ui/DetailRow";

function maskId(value) {
  if (!value) return value;
  let seen = 0;
  return [...value]
    .reverse()
    .map((c) => (/\d/.test(c) ? (++seen <= 4 ? c : "•") : c))
    .reverse()
    .join("");
}

function EmployeeGovIdsCard({ employee }) {
  const [revealed, setRevealed] = useState(false);
  const show = (v) => (revealed ? v : maskId(v));

  return (
    <SectionCard
      title="Government IDs"
      action={
        <button
          type="button"
          onClick={() => setRevealed((r) => !r)}
          aria-label={revealed ? "Hide IDs" : "Show IDs"}
          className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          {revealed ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
    >
      <dl className="px-5 py-2">
        <DetailRow label="Pag-IBIG" value={show(employee?.pagibigNum)} />
        <DetailRow label="PhilHealth" value={show(employee?.philhealthNum)} />
        <DetailRow label="PhylSIS" value={show(employee?.phylsisNum)} />
      </dl>
    </SectionCard>
  );
}

export default EmployeeGovIdsCard;