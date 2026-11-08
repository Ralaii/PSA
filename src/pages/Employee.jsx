import { useMemo } from "react";
import EmployeeToolbar from "../components/employee/EmployeeToolbar";
import { usePagination } from "../hooks/usePagination";
import { useSelection } from "../hooks/useSelection";
import { useQueryParams } from "../hooks/useQueryParams";
import { useEmployees } from "../hooks/useEmployees";
import EmployeeList from "../components/employee/EmployeeList";
import { useLocation, useNavigate } from "react-router";

const PAGE_SIZE = 25;
const FILTER_DEFAULTS = { q: "" };

function Employee() {

  const navigate = useNavigate();
  const { search } = useLocation();

  const goToDetail = (e) => navigate({ pathname: `/employee/${e.id}`, search });
  const { data: employees = [], isPending, isError } = useEmployees();

  const { values, resetKey } = useQueryParams(FILTER_DEFAULTS);
  const { q } = values;

  const selection = useSelection();

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return employees;
    return employees.filter((e) =>
      `${e.name ?? ""} ${e.email ?? ""} ${e.employeeNumber ?? ""}`
        .toLowerCase()
        .includes(term)
    );
  }, [employees, q]);

  const pager = usePagination(filtered, PAGE_SIZE, {
    resetKey,
    onPageChange: selection.clear,
  });
  const visible = pager.pageItems;

  const allSelected =
    visible.length > 0 && visible.every((e) => selection.selected.has(e.id));
  const someSelected = selection.size > 0 && !allSelected;

  const toggleAll = () =>
    allSelected ? selection.clear() : selection.setAll(visible.map((e) => e.id));

  return (
    <div>
      <EmployeeToolbar
        pager={pager}
        onPrev={pager.prev}
        onNext={pager.next}
        allSelected={allSelected}
        someSelected={someSelected}
        canSelect={filtered.length > 0}
        onToggleAll={toggleAll}
      />

      <div className="mx-auto max-w-6xl space-y-4 pt-6">
        <EmployeeList
          items={visible}
          isPending={isPending}
          isError={isError}
          selected={selection.selected}
          onToggleSelect={selection.toggle}
          onView={goToDetail}
        />
      </div>
    </div>
  );
}

export default Employee;