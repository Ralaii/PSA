import { Link } from "react-router";
import { BsChevronRight } from "react-icons/bs";
import Badge from "../ui/Badge";
import { getProjectStatus } from "../../config/employeeStatus";

function ProjectItem({ project }) {
  const status = getProjectStatus(project.status);

  return (
    <li>
      <Link
        to={`/project/${project.id}`}
        className="flex items-center justify-between gap-4 px-5 py-4 transition hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
      >
        <div className="min-w-0">
          <p className="truncate font-medium text-zinc-900 dark:text-zinc-100">
            {project.name}
          </p>
          <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
            {project.role}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Badge cls={status.cls}>{status.label}</Badge>
          <BsChevronRight className="text-zinc-400" />
        </div>
      </Link>
    </li>
  );
}

export default ProjectItem;