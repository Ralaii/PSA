import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { projectService } from "@/services/projectService";
import { toast } from "sonner";

export const projectKeys = {
  all: ["projects"],
  list: (params) => ["projects", "list", params],
  detail: (id) => ["projects", "detail", id],
};

export function useProjects({ page = 0, size = 25, sort, q = "", projectStatus } = {}) {
  return useQuery({
    queryKey: projectKeys.list({ page, size, sort, q, projectStatus }),
    queryFn: () => projectService.getList({ page, size, sort, q, projectStatus }),
    placeholderData: keepPreviousData,
  });
}

export function useProject(id) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectService.getById(id),
    enabled: !!id,
  });
}

function useMemberMutation(mutationFn, { success, error }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: projectKeys.all });
      toast.success(success);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message ?? error);
    },
  });
}

export const useAddProjectMember = (projectId) =>
  useMemberMutation(
    (body) => projectService.addMember(projectId, body),
    {
      success: "Successfully added Employee to Project",
      error: "Failed to add Employee to Project",
    }
  );

export const useUpdateProjectMember = (projectId) =>
  useMemberMutation(
    ({ assignmentId, ...body }) =>
      projectService.updateMember(projectId, assignmentId, body),
    {
      success: "Successfully updated Project Member",
      error: "Failed to update Project Member",
    }
  );

export const useRemoveProjectMember = (projectId) =>
  useMemberMutation(
    (assignmentId) => projectService.removeMember(projectId, assignmentId),
    {
      success: "Successfully removed Employee from Project",
      error: "Failed to remove Employee from Project",
    }
  );