import { Link } from "react-router";
import { formatEnum } from "@/lib/format";

const STATUS_STYLE = {
  PLANNING: "border-zinc-500/30 bg-zinc-500/10 text-zinc-600 dark:text-zinc-300",
  PENDING: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400",
  IN_PROGRESS: "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400",
  ON_HOLD: "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-400",
  COMPLETED: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  CANCELLED: "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400",
};

const fmtDate = (d) =>
  d
    ? new Date(`${d}T00:00:00`).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

const formatPeriod = (start, end) =>
  `${fmtDate(start) ?? "—"} – ${fmtDate(end) ?? "Present"}`;

function ProjectTile({ project }) {
  return (
    <li className="group relative flex flex-col rounded-xl border bg-background p-5 transition-colors hover:border-primary/40 hover:bg-accent/30">
      <div className="flex items-center justify-between gap-3">
        <span
          className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
            STATUS_STYLE[project?.projectStatus] ?? STATUS_STYLE.PLANNING
          }`}
        >
          {formatEnum(project?.projectStatus)}
        </span>
        {project?.projectProjectNum && (
          <span className="font-mono text-xs text-muted-foreground">{project.projectProjectNum}</span>
        )}
      </div>

      <h3 className="mt-3 text-sm font-semibold">
        {project?.projectId ? (
          <Link
            to={`/project/${project.projectId}`}
            className="after:absolute after:inset-0 after:content-[''] group-hover:underline"
          >
            {project.projectName}
          </Link>
        ) : (
          project?.projectName
        )}
      </h3>

      {project?.projectDescription && (
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
          {project.projectDescription}
        </p>
      )}

      <div className="mt-auto border-t pt-3 text-xs text-muted-foreground">
        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <span>
            Role: <span className="font-semibold text-foreground">{formatEnum(project?.projectPosition)}</span>
          </span>
          <span>
            Period:{" "}
            <span className="font-semibold text-foreground">
              {formatPeriod(project?.startDate, project?.endDate)}
            </span>
          </span>
        </div>
      </div>
    </li>
  );
}

function EmployeeProjectsContent({ projects, employeeName }) {
  return (
    <section className="rounded-xl border bg-card shadow-sm">
      <div className="border-b px-6 py-4">
        <h2 className="text-base font-semibold">Assigned Projects ({projects.length})</h2>
      </div>

      {projects.length === 0 ? (
        <p className="px-6 py-5 text-sm text-muted-foreground">No projects assigned yet.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectTile key={project?.projectId} project={project} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default EmployeeProjectsContent;