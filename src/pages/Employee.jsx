import { useState } from "react";
import EmployeeToolbar from "../components/employee/EmployeeToolbar";
import { usePagination } from "../hooks/usePagination";
import { useSelection } from "../hooks/useSelection";
import { useQueryParams } from "../hooks/useQueryParams";
import { useEmployees } from "../hooks/useEmployees";
import EmployeeList from "../components/employee/EmployeeList";
import { useLocation, useNavigate } from "react-router";
import CoeInput from "@/components/layout/CoeInput";

const PAGE_SIZE = 25;
const FILTER_DEFAULTS = { q: "" };

function Employee() {
  const navigate = useNavigate();
  const { search } = useLocation();

  const goToDetail = (e) => navigate({ pathname: `/employee/${e.id}`, search });

  const { values, resetKey } = useQueryParams(FILTER_DEFAULTS);
  const selection = useSelection();
  const [page, setPage] = useState(0);

  const { data, isPending, isError } = useEmployees({
    page, size: PAGE_SIZE, q: values.q.trim(),
  });

  const employees = data?.content ?? [];

  const pager = usePagination(employees, PAGE_SIZE, {
    resetKey,
    onPageChange: selection.clear,
    page,
    setPage,
    serverTotal: data?.totalElements ?? 0
  });
  const visible = pager.pageItems;

  const allSelected = visible.length > 0 && visible.every((e) => selection.selected.has(e.id));
  const someSelected = selection.size > 0 && !allSelected;

  const toggleAll = () => allSelected ? selection.clear() : selection.setAll(visible.map((e) => e.id));

  const [coeOpen, setCoeOpen] = useState(false)
  const [coeEmployee, setCoeEmployee] = useState(null)
  const selectedEmployee = selection.size === 1 ? visible.find((e) => selection.selected.has(e.id)) : null;

  const openCoe = (employee) => {
    if (!employee?.employeeNumber) return;
    setCoeEmployee(employee);
    setCoeOpen(true);
  }

  const detailEmployee = (e) => `/employee/${e.id}${search}`;

  return (
    <div>
      <EmployeeToolbar
        pager={pager}
        onPrev={pager.prev}
        onNext={pager.next}
        allSelected={allSelected}
        someSelected={someSelected}
        selectedCount={selection.size}
        canSelect={visible.length > 0}
        onToggleAll={toggleAll}
        onPreviewCoe={() => selectedEmployee && openCoe(selectedEmployee)}
      />

      <div className="mx-auto max-w-6xl space-y-4 pt-6">
        <EmployeeList
          items={visible}
          isPending={isPending}
          isError={isError}
          selected={selection.selected}
          onToggleSelect={selection.toggle}
          onView={goToDetail}
          onPreviewCoe={openCoe}
          detailEmployee={detailEmployee}
        />
      </div>
      {
        coeEmployee && (
          <CoeInput
            open={coeOpen}
            onOpenChange={setCoeOpen}
            employeeNumber={coeEmployee.employeeNumber}
          />
        )
      }
    </div>
  );
}

export default Employee;