import StatusBadge from "@/components/project/StatusBadge";
import { formatDate } from "@/utils/format";
import CellLink from "../ui/CellLink";

function ProjectTable({ projects, dimmed }) {
  if (projects.length === 0) {
    return (
      <p className="py-10 text-center text-muted-foreground">
        No projects found.
      </p>
    );
  }

  return (
    <div
      className={`overflow-x-auto rounded-xl border bg-card transition-opacity ${
        dimmed ? "opacity-60" : ""
      }`}
    >
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-medium whitespace-nowrap">Project No.</th>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium whitespace-nowrap">Start date</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => {
            const to = `/project/${p.id}`;
            return (
              <tr
                key={p.id}
                className="border-b transition-colors last:border-0 hover:bg-muted/40"
              >
                <td className="whitespace-nowrap p-0">
                  <CellLink
                    to={to}
                    className="font-mono text-xs text-muted-foreground"
                  >
                    {p.projectNumber}
                  </CellLink>
                </td>

                <td className="p-0">
                  <CellLink to={to} focusable>
                    <span className="font-medium">{p.name}</span>
                    {p.description && (
                      <span className="line-clamp-1 block text-xs text-muted-foreground">
                        {p.description}
                      </span>
                    )}
                  </CellLink>
                </td>

                <td className="p-0">
                  <CellLink to={to}>
                    <StatusBadge status={p.status} />
                  </CellLink>
                </td>

                <td className="whitespace-nowrap p-0">
                  <CellLink to={to}>{formatDate(p.startDate)}</CellLink>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProjectTable;