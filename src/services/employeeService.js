import api from "./api";

export const employeeService = {
  getAll: ({ page = 0, size = 25, q = "" } = {}) => api
  .get("/api/employees", {params: {page, size, sort: "employeeNumber,asc", q: q || undefined },
  }).then((res) => res.data),

  getById: (id) => api.get(`/api/employees/${id}`).then((res) => res.data),

  search: (q, limit = 5) =>
    api.get("/api/employees/search", { params: { q, limit } }).then((res) => res.data),
};