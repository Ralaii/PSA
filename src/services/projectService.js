import api from "./api";

export const projectService = {
  getList: ({ page, size, sort, q, projectStatus }) =>
    api
      .get("/api/project", {
        params: {
          page,
          size,
          sort,
          q: q || undefined,
          projectStatus: projectStatus || undefined,
        },
      })
      .then((r) => r.data),

  getById: (id) => api.get(`/api/project/${id}`).then((r) => r.data),

  search: (q) =>
    api.get("/api/project/search", { params: { q } }).then((r) => r.data),
};