import SectionCard from "../ui/SectionCard";
import { formatDate, formatEnum } from "@/lib/format";
import DetailRow from "../ui/DetailRow";
import { SEPARATION_LABEL } from "@/config/employeeStatus";

function EmployeeEmploymentCard({ employee }) {
  const separationLabel = SEPARATION_LABEL[employee?.status];

  return (
    <SectionCard title="Employment">
      <dl className="px-5 py-2">
        <DetailRow label="Employee no." value={employee?.employeeNumber} />
        <DetailRow label="Position" value={employee?.position} />
        <DetailRow label="Employment type" value={formatEnum(employee?.employmentType)} />
        <DetailRow label="Branch" value={employee?.branch?.name} />
        <DetailRow label="Location" value={employee?.branch?.location} />
        <DetailRow label="Date hired" value={formatDate(employee?.hireDate)} />
        {separationLabel && (
          <DetailRow
            label={separationLabel}
            value={formatDate(employee?.separatedAt)}
          />
        )}
      </dl>
    </SectionCard>
  );
}

export default EmployeeEmploymentCard;