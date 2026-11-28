import { useNavigate, useParams, useSearchParams } from "react-router";
import ProjectDetailToolbar from "../components/projectDetail/ProjectDetailToolbar";
import ProjectHeaderSection from "../components/projectDetail/ProjectHeaderSection";
import ProjectGeneralContent from "../components/projectDetail/ProjectGeneralContent";
import ProjectTeamContent from "../components/projectDetail/ProjectTeamContent";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useProject } from "@/hooks/useProject";

const TAB_VALUES = ["general", "timeline", "documents", "team"];

const triggerClass = [
  "h-auto flex-none px-3 py-3.5 focus-visible:ring-inset",
  "group-data-horizontal/tabs:after:bottom-0 after:bg-blue-600 dark:after:bg-zinc-200",
  "data-active:text-blue-600 dark:data-active:text-zinc-100 cursor-pointer",
].join(" ");

function ComingSoon({ label }) {
  return (
    <div className="rounded-xl border p-8 text-center text-sm text-muted-foreground">
      {label} is not available yet.
    </div>
  );
}

function ProjectDetails() {
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

  const tabs = [
    {
      value: "general",
      label: "General",
      content: <ProjectGeneralContent project={project} />,
    },
    {
      value: "timeline",
      label: "Timeline & Budget",
      content: <ComingSoon label="Timeline & Budget" />,
    },
    {
      value: "documents",
      label: "Documents",
      content: <ComingSoon label="Documents" />,
    },
    {
      value: "team",
      label: "Team Members",
      count: members.length,
      content: <ProjectTeamContent members={members} />,
    },
  ];
  console.log(project);
  return (
    <>
      <ProjectDetailToolbar
        onExport={() => {}}
        onManageTeam={() => handleTabChange("team")}
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
    </>
  );
}

export default ProjectDetails;