// TODO: read from env
export const API_BASE_URL = "https://university-event-management-system-1.onrender.com";

export async function api(path, { method = "GET", body, headers } = {}) {
  const res = await fetch(`${API_BASE_URL}/api${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
  });

  // Read the body ONCE
  const raw = await res.text();

  // Try to parse JSON, but don't read the stream again
  let data = null;
  try { data = raw ? JSON.parse(raw) : null; } catch (_) { /* not JSON */ }

  if (!res.ok) {
    const msg = data?.detail || data?.message || raw || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  // For success, return JSON if we have it; else return raw text or {}
  return data ?? (raw || {});
}
