import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getProfile, updateProfile } from "../../api/profile";
import { useNavigate, Link } from "react-router-dom";
import "./profile.css";

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState(""); const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [loading, user, navigate]);

  useEffect(() => {
    getProfile().then(setData).catch(e => setErr(String(e)));
  }, []);

  async function onSave(e) {
    e.preventDefault();
    setErr(""); setMsg(""); setSaving(true);
    const f = new FormData(e.currentTarget);
    try {
      const updated = await updateProfile({
        full_name: f.get("full_name"),
        department: f.get("department"),
        phone: f.get("phone"),
        email: f.get("email"),
      });
      setData(updated);
      setMsg("Profile updated");
    } catch (e2) { setErr(e2.message); }
    finally { setSaving(false); }
  }

  if (!data) return <main className="page-pad"><div className="container"><p>Loading profile…</p></div></main>;

  const role = data.role || "student";

  return (
    <main className="page-pad">
      <div className="container">
        <h1>My Profile</h1>

        <form className="card form-grid" onSubmit={onSave}>
          <label>Username<input value={data.username} disabled /></label>
          <label>Email<input name="email" defaultValue={data.email || ""} /></label>
          {role === "student" && (
            <label>Student ID<input value={data.student_id || ""} disabled /></label>
          )}
          <label>Full name<input name="full_name" defaultValue={data.full_name || ""} /></label>
          <label>Department<input name="department" defaultValue={data.department || ""} /></label>
          <label>Phone<input name="phone" defaultValue={data.phone || ""} /></label>
          <div style={{gridColumn:"1/-1"}}>
            <button className="primary" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button>
            {msg && <span className="ok">{msg}</span>}
            {err && <span className="err">{err}</span>}
          </div>
        </form>

        {role === "student" && (
          <section className="card">
            <h3>My Events</h3>
            <p>Followed: (coming soon)</p>
            <p>Participated: (coming soon)</p>
          </section>
        )}

        {role === "manager" && (
          <section className="card">
            <h3>Manager Shortcuts</h3>
            <p>Manage your events from your dashboard.</p>
            <Link className="primary" to="/dashboard/manager">Open Manager Dashboard</Link>
          </section>
        )}

        {role === "admin" && (
          <section className="card">
            <h3>Admin Shortcuts</h3>
            <Link className="primary" to="/dashboard/admin">Open Admin Dashboard</Link>
          </section>
        )}
      </div>
    </main>
  );
}
