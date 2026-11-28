import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import ProjectDetailToolbar from "../components/projectDetail/ProjectDetailToolbar";
import ProjectHeaderSection from "../components/projectDetail/ProjectHeaderSection";
import ProjectGeneralContent from "../components/projectDetail/ProjectGeneralContent";
import ProjectTeamContent from "../components/projectDetail/ProjectTeamContent";
import AddProjectMemberModal from "../components/projectDetail/AddProjectMemberModal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useProject } from "@/hooks/useProject";
import { isFormerMember } from "@/utils/project";

const TAB_VALUES = ["general", "team"];

const triggerClass = [
  "h-auto flex-none px-3 py-3.5 focus-visible:ring-inset",
  "group-data-horizontal/tabs:after:bottom-0 after:bg-blue-600 dark:after:bg-zinc-200",
  "data-active:text-blue-600 dark:data-active:text-zinc-100 cursor-pointer",
].join(" ");

function ProjectDetails() {
  const [addOpen, setAddOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: project, isPending, isError } = useProject(id);

  const [searchParams, setSearchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const activeTab = TAB_VALUES.includes(requestedTab) ? requestedTab : "general";

  const handleTabChange = (value) => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.set("tab", value);
        return next;
      },
      { replace: true }
    );
  };

  if (isPending) return <p className="p-4">Loading…</p>;
  if (isError) return <p className="p-4">Failed to load project.</p>;

  const members = project.members ?? [];
  const currentMembers = members.filter((m) => !isFormerMember(m));
  const currentIds = new Set(currentMembers.map((m) => m.employeeId));

  const tabs = [
    {
      value: "general",
      label: "General",
      content: <ProjectGeneralContent project={project} />,
    },
    {
      value: "team",
      label: "Team Members",
      count: currentMembers.length,
      content: <ProjectTeamContent members={members} />,
    },
  ];

  return (
    <>
      <ProjectDetailToolbar
        onExport={() => {}}
        onManageTeam={() => handleTabChange("team")}
        onAddMember={() => setAddOpen(true)}
        onEdit={() => navigate(`/project/${id}/edit`)}
      />

      <div className="mx-4 mt-4">
        <ProjectHeaderSection project={project} />

        <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-4">
          <TabsList
            variant="line"
            className="w-full justify-start gap-6 overflow-x-auto overflow-y-hidden border-b p-0 px-4 group-data-horizontal/tabs:h-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {tabs.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className={triggerClass}>
                <span className="relative">
                  {t.label}
                  {t.count != null && (
                    <span className="absolute -right-5 -top-2 min-w-4 rounded-full bg-blue-500 px-1 text-center text-[10px] leading-4 text-white">
                      {t.count}
                    </span>
                  )}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((t) => (
            <TabsContent key={t.value} value={t.value} className="pt-4">
              {t.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {addOpen && (
        <AddProjectMemberModal
          projectId={project.id}
          excludeIds={currentIds}
          onClose={() => setAddOpen(false)}
        />
      )}
    </>
  );
}

export default ProjectDetails;