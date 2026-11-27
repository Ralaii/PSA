import { useMemo, useState } from "react";
import ProjectToolbar from "@/components/project/ProjectToolbar";
import ProjectTable from "@/components/project/ProjectTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { usePagination } from "@/hooks/usePagination";
import { useProjects } from "@/hooks/useProject";
import { STATUS_TABS } from "@/config/projectStatus";
import { useQueryParams } from "@/hooks/useQueryParams";

const PAGE_SIZE = 25;
const FILTER_DEFAULTS = { q: "" }

function Project() {
  const { values, resetKey } = useQueryParams(FILTER_DEFAULTS);
  const [page, setPage] = useState(0);
  const [tab, setTab] = useState("ALL");

  const { data, isPlaceholderData } = useProjects({
    page,
    size: PAGE_SIZE,
    q: values.q.trim(),
    projectStatus: tab === "ALL" ? undefined : tab,
  });

  const projects = data?.content ?? [];

  const pager = usePagination(projects, PAGE_SIZE, {
    resetKey: `${resetKey}|${tab}`, // go back to page 0 when q or tab changes
    page,
    setPage,
    serverTotal: data?.totalElements ?? 0,
  });

  return (
    <>
      <ProjectToolbar
        pager={pager}
        onPrev={pager.prev}
        onNext={pager.next}
        disabled={isPlaceholderData}
      />

      <Tabs value={tab} onValueChange={setTab} className="min-w-0 mt-5">
        <div className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <TabsList variant="line" className="w-max min-w-full justify-start">
            {STATUS_TABS.map((t) => (
              <TabsTrigger key={t.value} value={t.value} className="flex-none px-3">
                {t.label}
                {t.value === tab && (
                  <span className="text-xs text-muted-foreground">
                    {data?.totalElements ?? 0}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {STATUS_TABS.map((t) => (
          <TabsContent key={t.value} value={t.value}>
            <ProjectTable projects={projects} dimmed={isPlaceholderData} />
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
}

export default Project;