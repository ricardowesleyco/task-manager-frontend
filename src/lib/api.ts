import axios from "axios";
import { getSession } from "next-auth/react";
const api = axios.create({ baseURL: "http://localhost:3001/api/v1" });

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

export default api;
