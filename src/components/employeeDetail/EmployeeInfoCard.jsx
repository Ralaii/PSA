import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Card from "../ui/Card";
import DetailRow from "../ui/DetailRow";
import { formatDate, formatEnum } from "@/lib/format";

function maskId(value) {
  if (!value) return value;
  let seen = 0;
  return [...value]
    .reverse()
    .map((c) => (/\d/.test(c) ? (++seen <= 4 ? c : "•") : c))
    .reverse()
    .join("");
}

function Section({ title, action, children }) {
  return (
    <section>
      <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h2>
        {action}
      </div>
      <dl className="px-5 py-2">{children}</dl>
    </section>
  );
}

function EmployeeInfoCard({ employee }) {
  const [revealed, setRevealed] = useState(false);
  const show = (v) => (revealed ? v : maskId(v));

  return (
    <Card className="divide-y divide-zinc-200 overflow-hidden dark:divide-zinc-800">
      <Section title="Personal information">
        <DetailRow label="Full name" value={employee?.name?.replace(/\s+/g, " ")} />
        <DetailRow label="Birth date" value={formatDate(employee?.birthDate)} />
        <DetailRow label="Gender" value={formatEnum(employee?.gender)} />
        <DetailRow label="Civil status" value={formatEnum(employee?.civilStatus)} />
      </Section>

      <Section title="Contact">
        <DetailRow label="Email" value={employee?.email} />
        <DetailRow label="Mobile" value={employee?.phoneNum} />
        <DetailRow label="Telephone" value={employee?.telephoneNum} />
      </Section>

      <Section
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
        <DetailRow label="Pag-IBIG" value={show(employee?.pagibigNum)} />
        <DetailRow label="PhilHealth" value={show(employee?.philhealthNum)} />
        <DetailRow label="PhylSIS" value={show(employee?.phylsisNum)} />
      </Section>
    </Card>
  );
}

export default EmployeeInfoCard;