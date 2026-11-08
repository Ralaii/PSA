import { BsBriefcase, BsBuilding, BsGeoAlt, BsPerson } from "react-icons/bs";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import { getEmployeeStatus } from "../../config/employeeStatus";
import { formatDate, getInitials } from "../../utils/format";

function InfoStat({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 px-5 py-4">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-lg text-zinc-600 dark:border-zinc-700 dark:text-zinc-300">
        <Icon />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{label}</p>
        <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
          {value || "—"}
        </p>
      </div>
    </div>
  );
}

function EmployeeHeader({ employee }) {
  const status = getEmployeeStatus(employee.status);

  return (
    <Card>
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-blue-600/10 text-xl font-semibold text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
            {getInitials(employee.name)}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {employee.name}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                {employee.employeeNumber}
              </span>
              <Badge cls={status.cls}>{status.label}</Badge>
            </div>
          </div>
        </div>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Hired on{" "}
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {formatDate(employee.hiredAt)}
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 divide-y divide-zinc-200 border-t border-zinc-200 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x dark:divide-zinc-800 dark:border-zinc-800">
        <InfoStat icon={BsPerson} label="Employee status" value={status.label} />
        <InfoStat icon={BsBriefcase} label="Position" value={employee.position} />
        <InfoStat icon={BsBuilding} label="Department" value={employee.department} />
        <InfoStat icon={BsGeoAlt} label="Location" value={employee.location} />
      </div>
    </Card>
  );
}

export default EmployeeHeader;