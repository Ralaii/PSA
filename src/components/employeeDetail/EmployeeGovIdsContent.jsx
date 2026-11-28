import Field from "../ui/Field";

function EmployeeGovIdsContent({ employee }) {
  return (
    <section className="rounded-xl border bg-card shadow-sm">
      <h2 className="border-b px-6 py-4 text-base font-semibold">
        Government IDs
      </h2>

      <dl className="grid grid-cols-1 gap-x-8 gap-y-5 px-6 py-5 sm:grid-cols-2 lg:grid-cols-2">
        <Field label="Pag-IBIG" value={employee?.pagibigNum} mono copyable />
        <Field label="PhilHealth" value={employee?.philhealthNum} mono copyable />
        <Field label="PhilSys" value={employee?.phylsisNum} mono copyable />
      </dl>
    </section>
  );
}

export default EmployeeGovIdsContent;