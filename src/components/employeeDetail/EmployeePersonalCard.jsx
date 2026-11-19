import DetailRow from "../ui/DetailRow";
import SectionCard from "../ui/SectionCard";
import { formatDate, formatEnum } from "@/lib/format";

function EmployeePersonalCard({ employee }) {
  return (
    <SectionCard title="Personal information">
      <dl className="px-5 py-2">
        <DetailRow label="Full name" value={employee?.name?.replace(/\s+/g, " ")} />
        <DetailRow label="Birth date" value={formatDate(employee?.birthDate)} />
        <DetailRow label="Gender" value={formatEnum(employee?.gender)} />
        <DetailRow label="Civil status" value={formatEnum(employee?.civilStatus)} />
      </dl>
    </SectionCard>
  );
}

export default EmployeePersonalCard;