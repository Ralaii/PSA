import api from "./api";

export const loginRequest = async ({ identifier, password }) => {
  const { data } = await api.post("/api/auth/login", {
    username: identifier, 
    password,
  });
  return data;
};

export const registerRequest = async (fields) => {
  const { data } = await api.post("/api/auth/register", fields);
  return data;
};

export const getMeRequest = async () => {
  try {
    const { data } = await api.get("/api/auth/me");
    return data;
  } catch (err) {
    if (err.status === 401) return null;
    throw err;
  }
}

export const logoutRequest = async () => await api.post("api/auth/logout")