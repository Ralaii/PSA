import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "../services/notificationService";

const KEY = ["notifications"];

export const useNotifications = () => {
  return useQuery({
    queryKey: KEY,
    queryFn: () => notificationService.getAll(),
  });
};

export const useNotification = (id) => {
  return useQuery({
    queryKey: [...KEY, id],
    queryFn: () => notificationService.getById(id),
    enabled: !!id,
    retry: false,
  });
};

export const useMarkAllRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: () => notificationService.markAllRead(),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};

export const useDeleteNotification = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (notificationId) => notificationService.remove(notificationId),
    onSuccess: (_, notificationId) => {
      qc.removeQueries({ queryKey: [...KEY, notificationId] });
      qc.invalidateQueries({ queryKey: KEY });
    },
  });
};

export const useMarkRead = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (notificationId) => notificationService.markRead(notificationId),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};

export const useMarkUnread = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (notificationId) => notificationService.markUnread(notificationId),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};

// ---- Bulk (one request for many ids) ----

export const useDeleteNotifications = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ids) => notificationService.removeMany(ids),
    onSuccess: (_, ids) => {
      ids.forEach((id) => qc.removeQueries({ queryKey: [...KEY, id] }));
      qc.invalidateQueries({ queryKey: KEY });
    },
  });
};

export const useMarkReadMany = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ids) => notificationService.markReadMany(ids),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};

export const useMarkUnreadMany = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ids) => notificationService.markUnreadMany(ids),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
};