import Field from "../ui/Field";
import { formatDate, formatEnum } from "@/lib/format";
import { SEPARATION_LABEL } from "@/config/employeeStatus";

function EmployeeEmploymentContent({ employee }) {
  const separationLabel = SEPARATION_LABEL[employee?.status];

  return (
    <section className="rounded-xl border bg-card shadow-sm">
      <h2 className="border-b px-6 py-4 text-base font-semibold">
        Employment Information
      </h2>

      <dl className="grid grid-cols-1 gap-x-8 gap-y-5 px-6 py-5 sm:grid-cols-2 lg:grid-cols-2">
        <Field label="Employee no." value={employee?.employeeNumber} mono copyable />
        <Field label="Position" value={employee?.position} />
        <Field label="Employment type" value={formatEnum(employee?.category)} />
        <Field label="Branch" value={employee?.branch?.name} />
        <Field label="Location" value={employee?.branch?.location} />
        <Field label="Date hired" value={formatDate(employee?.hireDate)} />
        {separationLabel && (
          <Field label={separationLabel} value={formatDate(employee?.separatedAt)} />
        )}
      </dl>
    </section>
  );
}

export default EmployeeEmploymentContent;