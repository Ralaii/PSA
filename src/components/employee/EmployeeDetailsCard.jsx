import SectionCard from "../ui/SectionCard";
import DetailRow from "../ui/DetailRow";
import { SEPARATION_LABEL } from "../../config/employeeStatus";
import { formatDate } from "../../utils/format";

function EmployeeDetailsCard({ employee }) {
  return (
    <SectionCard
      title="General details"
    >
      <dl className="px-5 py-2">
        <DetailRow label="Full name" value={employee.name} />
        <DetailRow label="Employee no." value={employee.employeeNumber} />
        <DetailRow label="Email" value={employee.email} />
        <DetailRow label="Mobile" value={employee.mobile} />
        <DetailRow label="Location" value={employee.location} />
        <DetailRow label="Supervisor" value={employee.supervisor} />
        <DetailRow label="Date hired" value={formatDate(employee.hiredAt)} />
        {SEPARATION_LABEL[employee.status] && (
          <DetailRow
            label={SEPARATION_LABEL[employee.status]}
            value={formatDate(employee.separatedAt)}
          />
        )}
      </dl>
    </SectionCard>
  );
}

export default EmployeeDetailsCard;