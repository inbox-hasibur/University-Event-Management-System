import React, { useState } from "react";
import "../Profile/Profile.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/events";

export default function CreateEvent() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [msg, setMsg] = useState(""); const [err, setErr] = useState(""); const [saving, setSaving] = useState(false);
  const [regChecked, setRegChecked] = useState(false);
  const [regStatus, setRegStatus] = useState("off");

  if (!loading && (!user || (user.role !== "manager" && user.role !== "admin"))) {
    navigate("/login");
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setMsg(""); setSaving(true);

    const f = new FormData(e.currentTarget);
    // registration toggle -> boolean
    const registration_open = regChecked && regStatus === "on";
    f.set("registration_open", registration_open ? "true" : "false");

    try {
      const ev = await createEvent(f);
      navigate(`/events/${ev.id}`);
    } catch (e2) {
      setErr(e2.message || "Failed to create event");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="page-pad">
      <div className="container">
        <h1>{user?.role === "admin" ? "Admin: Create Event" : "Manager: Create Event"}</h1>

        <form className="card form-grid" onSubmit={onSubmit}>
          <label>Title
            <input name="title" placeholder="Event title" required />
          </label>

          <label>Venue
            <input name="venue" placeholder="e.g., Auditorium" required />
          </label>

          <label>Category
            <select name="category" required defaultValue="departmental">
              <option value="departmental">Departmental</option>
              <option value="non_departmental">Non-Departmental</option>
              <option value="outside">Outside the university</option>
            </select>
          </label>

          <label>Featured
            <select name="featured" defaultValue="false">
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </label>

          <label>Start time
            <input name="start_time" type="datetime-local" required />
          </label>
          <label>End time
            <input name="end_time" type="datetime-local" required />
          </label>

          <label style={{ gridColumn: "1 / -1" }}>Description (plain text)
            <textarea
              name="description_html"
              rows={8}
              placeholder={`Paste your description here.
• Bullet points will show as text.
- Dashes work too.`}
            />
          </label>

          <label style={{ gridColumn: "1 / -1" }}>Online link (Zoom/Meet, optional)
            <input name="online_link" type="url" placeholder="https://..." />
          </label>

          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12, alignItems: "center" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={regChecked} onChange={(e) => setRegChecked(e.target.checked)} />
              Registration
            </label>
            {regChecked && (
              <select value={regStatus} onChange={(e)=>setRegStatus(e.target.value)}>
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
            )}
          </div>

          <label style={{ gridColumn: "1 / -1" }}>Cover image (optional)
            <input name="cover" type="file" accept="image/*" />
          </label>

          <label>Status
            <select name="status" defaultValue="draft">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>

          <div style={{gridColumn:"1 / -1"}}>
            <button className="primary" disabled={saving}>{saving ? "Creating…" : "Create Event"}</button>
            {msg && <span className="ok">{msg}</span>}
            {err && <span className="err">{err}</span>}
          </div>
        </form>
      </div>
    </main>
  );
}
