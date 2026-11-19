import SectionCard from "../ui/SectionCard";
import DetailRow from "../ui/DetailRow";

function EmployeeContactCard({ employee }) {
  return (
    <SectionCard title="Contact">
      <dl className="px-5 py-2">
        <DetailRow label="Email" value={employee?.email} />
        <DetailRow label="Mobile" value={employee?.phoneNum} />
        <DetailRow label="Telephone" value={employee?.telephoneNum} />
      </dl>
    </SectionCard>
  );
}

export default EmployeeContactCard;