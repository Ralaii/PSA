import { useState } from "react";
import { Link } from "react-router";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate, getInitials } from "@/utils/format";
import { isFormerMember } from "@/utils/project";

const FILTERS = [
  { value: "current", label: "Current" },
  { value: "former", label: "Former" },
  { value: "all", label: "All" },
];

function dateRange(member) {
  const start = formatDate(member.startDate);
  const end = member.endDate ? formatDate(member.endDate) : "Present";
  return `${start} – ${end}`;
}

function ProjectTeamContent({ members }) {
  const [filter, setFilter] = useState("current");

  const visible = members.filter((m) => {
    if (filter === "all") return true;
    return filter === "former" ? isFormerMember(m) : !isFormerMember(m);
  });

  return (
    <section className="rounded-xl border bg-card text-card-foreground">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-3">
        <h2 className="text-base font-semibold">Team Members</h2>

        <Tabs value={filter} onValueChange={setFilter}>
          <TabsList>
            {FILTERS.map((f) => (
              <TabsTrigger key={f.value} value={f.value} className="cursor-pointer">
                {f.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {visible.length === 0 ? (
        <p className="p-8 text-center text-sm text-muted-foreground">
          {filter === "former"
            ? "No former team members."
            : "No team members assigned yet."}
        </p>
      ) : (
        <ul className="divide-y">
          {visible.map((member) => {
            const former = isFormerMember(member);
            return (
              <li key={member.assignmentId}>
                <Link
                  to={`/employee/${member.employeeId}`}
                  className={`flex items-center gap-3 px-5 py-3 transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none ${
                    former ? "opacity-60" : ""
                  }`}
                >
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"
                    aria-hidden="true"
                  >
                    {getInitials(member.name)}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{member.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {member.projectEmployeeNum} · {dateRange(member)}
                    </p>
                  </div>

                  {member.projectPosition && (
                    <span className="shrink-0 rounded-full border bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                      {member.projectPosition}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default ProjectTeamContent;