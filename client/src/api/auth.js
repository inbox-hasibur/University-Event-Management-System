import { api } from "./client";

export const register = ({ username, student_id, email, password }) =>
  api("/auth/register/", { method: "POST", body: { role: "student", username, student_id, email, password } });

export const login = ({ role = "student", email, student_id, password }) =>
  api("/auth/login/", { method: "POST", body: { role, email, student_id, password } });

export const me = () => api("/auth/me/");
export const logout = () => api("/auth/logout/", { method: "POST" });
