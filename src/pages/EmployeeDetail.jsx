import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useEmployee } from "../hooks/useEmployees";
import EmployeeDetailToolbar from "../components/employeeDetail/EmployeeDetailToolbar";
import EmployeeHeaderSection from "../components/employeeDetail/EmployeeHeaderSection";
import EmployeeProjectsContent from "../components/employeeDetail/EmployeeProjectsContent";
import { EmployeeDetailSkeleton } from "@/components/skeleton/EmployeeDetailSkeleton";
import { EmployeeErrorCard } from "@/components/error/EmployeeErrorCard";
import CoeInput from "@/components/layout/CoeInput";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import EmployeeEmploymentContent from "../components/employeeDetail/EmployeeEmploymentContent";
import EmployeeProfileContent from "@/components/employeeDetail/EmployeeProfileContent";
import EmployeeGovIdsContent from "../components/employeeDetail/EmployeeGovIdsContent";

const TAB_VALUES = ["general", "employment", "gov-ids", "projects"];

const triggerClass = [
  "h-auto flex-none px-3 py-3.5 focus-visible:ring-inset",
  "group-data-horizontal/tabs:after:bottom-0 after:bg-blue-600 dark:after:bg-zinc-200",
  "data-active:text-blue-600 dark:data-active:text-zinc-100 cursor-pointer",
].join(" ");

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employee, isPending, isError, error } = useEmployee(id);
  const [coeOpen, setCoeOpen] = useState(false);

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

  if (isPending) return <EmployeeDetailSkeleton />;
  if (isError) return <EmployeeErrorCard error={error} />;

  const projects = employee.projects ?? [];

const tabs = [
  {
    value: "general",
    label: "General",
    content: <EmployeeProfileContent employee={employee} />,
  },
  {
    value: "employment",
    label: "Employment",
    content: <EmployeeEmploymentContent employee={employee} />,
  },
  {
    value: "gov-ids",
    label: "Government IDs",
    content: <EmployeeGovIdsContent employee={employee} />,
  },
  {
    value: "projects",
    label: "Projects",
    count: projects.length,
    content: <EmployeeProjectsContent projects={projects} employeeName={employee.name} />,
  },
];
  return (
    <>
      <EmployeeDetailToolbar
        employee={employee}
        onEdit={() => navigate(`/employee/${employee.id}/edit`)}
        onPreviewCoe={() => setCoeOpen(true)}
      />

      <CoeInput
        open={coeOpen}
        onOpenChange={setCoeOpen}
        employeeNumber={employee.employeeNumber}
      />

      <div className="mx-4 mt-4">
        <EmployeeHeaderSection employee={employee} />

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

export default EmployeeDetail;