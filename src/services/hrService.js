import api from "./api";

export const previewCoe = async (employeeNumber, body) => {
  const res = await api.post(`/api/hr/preview-coe/${employeeNumber}/preview`, body, {
    responseType: "blob",
    timeout: 20000,
  });
  return res.data;
};