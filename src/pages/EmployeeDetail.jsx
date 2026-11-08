import { Link, useNavigate, useParams } from "react-router";
import { useEmployee } from "../hooks/useEmployees";
import Card from "../components/ui/Card";
import EmployeeDetailToolbar from "../components/employee/EmployeeDetailToolbar";
import EmployeeHeader from "../components/employee/EmployeeHeader";
import EmployeeDetailsCard from "../components/employee/EmployeeDetailsCard";
import EmployeeProjectsCard from "../components/employee/EmployeeProjectsCard";

function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: employee, isPending, isError, error } = useEmployee(id);

  const goEdit = () => navigate(`/employee/${employee?.id ?? id}/edit`);

  return (
    <>
      {/* Toolbar: full width, so it sits at the top left */}
      <EmployeeDetailToolbar
        employee={employee}
        onDownloadCoe={() => {}}
        onEdit={goEdit}
      />

      {/* Content: stays centered */}
      <div className="mx-auto w-full max-w-[1600px] space-y-4">
        {isPending ? (
          <Card className="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            Loading…
          </Card>
        ) : isError ? (
          <Card className="p-8 text-center">
            <p className="font-medium text-zinc-900 dark:text-zinc-100">
              {error.response?.data?.message ?? error.message ?? "Something went wrong"}
            </p>
            <Link
              to="/employee"
              className="mt-3 inline-block text-sm text-blue-600 hover:underline dark:text-blue-400"
            >
              Back to employees
            </Link>
          </Card>
        ) : (
          <>
            <EmployeeHeader employee={employee} />

            <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
              <EmployeeDetailsCard employee={employee} onEdit={goEdit} />
              <EmployeeProjectsCard projects={employee.projects ?? []} />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default EmployeeDetail;