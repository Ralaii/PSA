import AssignmentModal from "@/components/ui/AssignmentModal";
import { useEmployeeSearch } from "@/hooks/useEmployees";
import { useAddProjectMember } from "@/hooks/useProject";

function AddProjectMemberModal({ projectId, excludeIds, onClose }) {
  const add = useAddProjectMember(projectId);

  return (
    <AssignmentModal
      title="Add Project Member"
      submitLabel="Add Project Member"
      picker={{
        label: "Employee",
        placeholder: "Search employee number or name...",
        hint: "HR can search using either the employee number or name.",
        useSearch: useEmployeeSearch,
        excludeIds,
      }}
      isPending={add.isPending}
      error={add.error?.response?.data?.message ?? (add.isError ? "Something went wrong." : "")}
      onClose={onClose}
      onSubmit={({ picked, ...body }) =>
        add.mutate({ employeeId: picked.id, ...body }, { onSuccess: onClose })
      }
    />
  );
}

export default AddProjectMemberModal;