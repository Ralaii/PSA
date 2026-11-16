import api from "./api";

export const notificationService = {
  getAll: () => api.get("/notifications").then((res) => res.data),
  getById: (id) => api.get(`/notifications/${id}`).then((res) => res.data),

  markRead: (id) => api.patch(`/notifications/${id}/read`).then((res) => res.data),
  markUnread: (id) => api.patch(`/notifications/${id}/unread`).then((res) => res.data),
  markAllRead: () => api.patch("/notifications/read-all").then((res) => res.data),
  remove: (id) => api.delete(`/notifications/${id}`).then((res) => res.data),

  // Bulk (one request for many ids)
  markReadMany: (ids) => api.post("/notifications/bulk-read", { ids }).then((res) => res.data),
  markUnreadMany: (ids) => api.post("/notifications/bulk-unread", { ids }).then((res) => res.data),
  removeMany: (ids) => api.post("/notifications/bulk-delete", { ids }).then((res) => res.data),

  // Search Query
  search: (q, limit = 5) => api.get("/notifications", { params: { q, limit } }).then((res) => res.data),
};