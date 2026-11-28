import { CalendarCheck, CalendarDays, Flag, Users } from "lucide-react";
import Card from "@/components/ui/Card";
import InfoStat from "@/components/layout/InfoStat";
import StatusBadge from "../project/StatusBadge";
import { STATUS_LABEL } from "@/config/projectStatus";
import { formatDate, getInitials } from "@/utils/format";
import { isFormerMember } from "@/utils/project";

function ProjectHeaderSection({ project }) {
  const memberCount = (project.members ?? []).filter((m) => !isFormerMember(m)).length;

  return (
    <Card>
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center gap-4">
          <div
            className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-xl font-semibold text-blue-600 dark:bg-blue-400/10 dark:text-blue-400"
            aria-hidden="true"
          >
            {getInitials(project.name)}
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {project.name}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <StatusBadge status={project.status} />
            </div>
          </div>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Started on{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {formatDate(project.startDate)}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 divide-y divide-zinc-200 border-t border-zinc-200 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4 dark:divide-zinc-800 dark:border-zinc-800">
        <InfoStat
          icon={Flag}
          label="Project status"
          value={STATUS_LABEL[project.status] ?? project.status}
        />
        <InfoStat icon={CalendarDays} label="Start date" value={formatDate(project.startDate)} />
        <InfoStat icon={CalendarCheck} label="Target end date" value={formatDate(project.endDate)} />
        <InfoStat
          icon={Users}
          label="Team members"
          value={`${memberCount} ${memberCount === 1 ? "member" : "members"}`}
        />
      </div>
    </Card>
  );
}

export default ProjectHeaderSection;