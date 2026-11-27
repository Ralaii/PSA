import { formatDate, formatEnum } from "@/lib/format";
import Field from "../ui/field";

function EmployeeProfileContent({ employee }) {
  return (
    <section className="rounded-xl border bg-card shadow-sm">
      <h2 className="border-b px-6 py-4 text-base font-semibold">
        Personal &amp; Contact Information
      </h2>

      <dl className="grid grid-cols-1 gap-x-8 gap-y-5 px-6 py-5 sm:grid-cols-2 lg:grid-cols-2">
        <Field label="Full name" value={employee?.name?.replace(/\s+/g, " ")} />
        <Field label="Birth date" value={formatDate(employee?.birthDate)} />
        <Field label="Gender" value={formatEnum(employee?.gender)} />
        <Field label="Civil status" value={formatEnum(employee?.civilStatus)} />
        <Field label="Email" value={employee?.email} href={`mailto:${employee?.email}`} copyable />
        <Field label="Mobile" value={employee?.phoneNum} mono copyable />
        <Field label="Telephone" value={employee?.telephoneNum} mono copyable />
      </dl>
    </section>
  );
}

export default EmployeeProfileContent;