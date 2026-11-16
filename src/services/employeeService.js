import api from "./api";

export const employeeService = {
  getAll: () => api.get("/employees").then((res) => res.data),
  getById: (id) => api.get(`/employees/${id}`).then((res) => res.data),
  search: (q, limit = 5) =>
    api.get("/employees", { params: { q, limit } }).then((res) => res.data),
};