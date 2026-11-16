import SectionCard from "../ui/SectionCard";
import ProjectItem from "./ProjectItem";

function EmployeeProjectsCard({ projects }) {
  return (
    <SectionCard
      title="Projects"
      action={
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {projects.length} total
        </span>
      }
    >
      {projects.length === 0 ? (
        <p className="p-5 text-sm text-zinc-500 dark:text-zinc-400">
          No projects assigned yet.
        </p>
      ) : (
        <ul className="divide-y divide-zinc-200 overflow-hidden rounded-b-xl dark:divide-zinc-800">
          {projects.map((project) => (
            <ProjectItem key={project.id} project={project} />
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

export default EmployeeProjectsCard;