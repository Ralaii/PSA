import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { projectService } from "@/services/projectService";

export const projectKeys = {
  all: ["projects"],
  list: (params) => ["projects", "list", params],
};

export function useProjects({ page = 0, size = 25, sort, q = "", projectStatus } = {}) {
  return useQuery({
    queryKey: projectKeys.list({ page, size, sort, q, projectStatus }),
    queryFn: () => projectService.getList({ page, size, sort, q, projectStatus }),
    placeholderData: keepPreviousData,
  });
}