import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  withXSRFToken: true,
  timeout: 5000
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message ||
      (err.request ? "Cannot reach the server." : "Something went wrong.");
    const error = new Error(message);
    error.status = err.response?.status;
    error.isNetworkError = !err.response;
    return Promise.reject(error);
  }
);

export default api;