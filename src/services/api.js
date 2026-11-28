import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  timeout: 5000
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    let data = err.response?.data;
    if (data instanceof Blob) {
      try {
        data = JSON.parse(await data.text());
      } catch {
        data = undefined;
      }
    }

    // retry once when the server rejects a stale or missing CSRF token
    const isCsrf403 =
      err.response?.status === 403 && /csrf/i.test(data?.message ?? "");

    if (isCsrf403 && err.config && !err.config._csrfRetried) {
      err.config._csrfRetried = true;
      return api.request(err.config);
    }

    const message =
      data?.message ||
      (err.response
        ? "Request failed."
        : err.request
          ? "Cannot reach the server."
          : "Something went wrong.");

    const error = new Error(message);
    error.status = err.response?.status;
    error.data = data;
    error.isNetworkError = !err.response;
    return Promise.reject(error);
  }
);

export default api;