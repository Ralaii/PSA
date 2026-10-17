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