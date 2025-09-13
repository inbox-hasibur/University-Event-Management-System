import { api } from "./client";

export function listEvents(params = {}) {
  const q = new URLSearchParams(params).toString();
  return api(`/events/${q ? `?${q}` : ""}`);
}

export function getEvent(id) {
  return api(`/events/${id}/`);
}

// multipart create
export async function createEvent(form) {
  // form is a FormData
  const res = await fetch(`/api/events/`, {
    method: "POST",
    body: form,
    credentials: "include",
  });
  const raw = await res.text();
  let data = null; try { data = raw ? JSON.parse(raw) : null; } catch {}
  if (!res.ok) throw new Error(data?.detail || raw || `HTTP ${res.status}`);
  return data;
}

// multipart update (for replace/remove cover later)
export async function updateEvent(id, form) {
  const res = await fetch(`/api/events/${id}/`, {
    method: "PATCH",
    body: form,
    credentials: "include",
  });
  const raw = await res.text();
  let data = null; try { data = raw ? JSON.parse(raw) : null; } catch {}
  if (!res.ok) throw new Error(data?.detail || raw || `HTTP ${res.status}`);
  return data;
}


// DELETE
export async function deleteEvent(id) {
  const res = await fetch(`/api/events/${id}/`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!res.ok && res.status !== 204) {
    const txt = await res.text();
    throw new Error(txt || `HTTP ${res.status}`);
  }
  return true;
}