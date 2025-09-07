import { api } from "./client";

export const getProfile     = () => api("/profile/");
export const updateProfile  = (payload) => api("/profile/", { method: "PATCH", body: payload });

export const adminStats     = () => api("/admin/stats/");
export const adminListUsers = () => api("/admin/users/");
export const adminAssignMgr = (id) => api(`/admin/users/${id}/assign_manager/`, { method: "POST" });
export const adminDeleteUser= (id) => api(`/admin/users/${id}/`, { method: "DELETE" });
