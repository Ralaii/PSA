import { formatDate } from "@/lib/format";

function Field({ label, children, className = "" }) {
  return (
    <div className={`border-b pb-3 ${className}`}>
      <dt className="text-xs text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm font-medium">{children}</dd>
    </div>
  );
}

function ProjectGeneralContent({ project }) {
  return (
    <section className="rounded-xl border bg-card text-card-foreground">
      <h2 className="border-b px-5 py-4 text-base font-semibold">
        Project Information
      </h2>

      <dl className="grid grid-cols-1 gap-x-12 gap-y-5 p-5 md:grid-cols-2">
        <Field label="Project Name">{project.name}</Field>
        <Field label="Start Date">{formatDate(project.startDate)}</Field>
        <Field label="Target End Date">{formatDate(project.endDate)}</Field>
      </dl>
    </section>
  );
}

export default ProjectGeneralContent;