import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({ baseURL: `${BASE}/api` });

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const isAuthed = () => !!localStorage.getItem("token");
export const getUser  = () => {
  try { return JSON.parse(localStorage.getItem("user") || "null"); }
  catch { return null; }
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// ---- endpoints ----
export const authApi = {
  register: (data) => api.post("/auth/register", data).then((r) => r.data),
  login:    (data) => api.post("/auth/login",    data).then((r) => r.data),
  me:       ()     => api.get("/auth/me").then((r) => r.data),
};

export const uploadApi = {
  video: (file, onProgress) => {
    const fd = new FormData();
    fd.append("file", file);
    return api.post("/upload/video", fd, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (e) => {
        if (onProgress && e.total) onProgress(Math.round((e.loaded * 100) / e.total));
      },
    }).then((r) => r.data);
  },
};

export const analysisApi = {
  get:    (id) => api.get(`/analysis/${id}`).then((r) => r.data),
  report: (id) => `${BASE}/api/analysis/${id}/report`,
};

export const dashboardApi = {
  interviews: () => api.get("/dashboard/interviews").then((r) => r.data),
  stats:      () => api.get("/dashboard/stats").then((r) => r.data),
};
