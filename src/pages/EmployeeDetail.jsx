import { useNavigate, useParams } from "react-router";
import { useEmployee } from "../hooks/useEmployees";
import EmployeeDetailToolbar from "../components/employeeDetail/EmployeeDetailToolbar";
import EmployeeHeaderSection from "../components/employeeDetail/EmployeeHeaderSection";
import EmployeePersonalCard from "../components/employeeDetail/EmployeePersonalCard";
import EmployeeContactCard from "../components/employeeDetail/EmployeeContactCard";
import EmployeeGovIdsCard from "../components/employeeDetail/EmployeeGovIdsCard";
import EmployeeEmploymentCard from "../components/employeeDetail/EmployeeEmploymentCard";
import EmployeeProjectsCard from "../components/employeeDetail/EmployeeProjectsCard";
import { EmployeeDetailSkeleton } from "@/components/skeleton/EmployeeDetailSkeleton";
import { EmployeeErrorCard } from "@/components/error/EmployeeErrorCard";
import EmployeeInfoCard from "@/components/employeeDetail/EmployeeInfoCard";

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employee, isPending, isError, error } = useEmployee(id);

  if (isPending) return <EmployeeDetailSkeleton />;
  if (isError) return <EmployeeErrorCard error={error} />;

  const goEdit = () => navigate(`/employee/${employee.id}/edit`);

  return (
    <>
      <EmployeeDetailToolbar
        employee={employee}
        onDownloadCoe={() => {}}
        onEdit={goEdit}
      />

      <EmployeeHeaderSection employee={employee} />

      <div className="mx-auto mt-4 grid w-full max-w-[1600px] grid-cols-1 items-start gap-4 lg:grid-cols-2">
        <EmployeeInfoCard employee={employee} />

        <div className="space-y-4">
          <EmployeeEmploymentCard employee={employee} />
          <EmployeeProjectsCard projects={employee.projects} />
        </div>
      </div>
    </>
  );
}

export default EmployeeDetail;