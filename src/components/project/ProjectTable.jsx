import { Link, useNavigate } from "react-router";
import StatusBadge from "@/components/project/StatusBadge";

function formatDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function ProjectTable({ projects, dimmed }) {
  const navigate = useNavigate();

  if (projects.length === 0) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        No projects found.
      </p>
    );
  }

  return (
    <div
      className={`overflow-hidden rounded-xl border bg-card transition-opacity ${
        dimmed ? "opacity-60" : ""
      }`}
    >
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium">Project No.</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Start date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr
              key={p.id}
              onClick={() => navigate(`/project/${p.id}`)}
              className="cursor-pointer border-b last:border-0 transition-colors hover:bg-muted/40"
            >
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {p.projectNumber}
              </td>
              <td className="px-4 py-3">
                <Link
                  to={`/project/${p.id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="font-medium hover:underline"
                >
                  {p.name}
                </Link>
                {p.description && (
                  <div className="line-clamp-1 text-xs text-muted-foreground">
                    {p.description}
                  </div>
                )}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={p.status} />
              </td>
              <td className="px-4 py-3">{formatDate(p.startDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;