import React, { useEffect, useState } from "react";
import "../Profile/profile.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, updateEvent, deleteEvent } from "../../api/events";

export default function EditEvent() {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [ev, setEv] = useState(null);
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);
  const [regChecked, setRegChecked] = useState(false);
  const [regStatus, setRegStatus] = useState("off");
  const [removeCover, setRemoveCover] = useState(false);

  useEffect(() => {
    if (!loading && (!user || (user.role !== "manager" && user.role !== "admin"))) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  useEffect(() => {
    getEvent(id).then((d) => {
      setEv(d);
      setRegChecked(true);               // show the dropdown
      setRegStatus(d.registration_open ? "on" : "off");
    }).catch(e => setErr(String(e)));
  }, [id]);

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setSaving(true);

    const f = new FormData(e.currentTarget);
    // registration
    f.set("registration_open", regChecked && regStatus === "on" ? "true" : "false");
    // remove cover?
    if (removeCover) f.set("remove_cover", "true");

    try {
      const upd = await updateEvent(id, f);
      navigate(`/events/${upd.id}`);
    } catch (e2) {
      setErr(e2.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!confirm("Delete this event?")) return;
    try {
      await deleteEvent(id);
      // Send back to a dashboard
      navigate(user?.role === "admin" ? "/dashboard/admin" : "/dashboard/manager");
    } catch (e2) {
      setErr(e2.message || "Delete failed");
    }
  }

  if (!ev) {
    return (
      <main className="page-pad"><div className="container">
        {err ? <p className="err">{err}</p> : <p>Loading…</p>}
      </div></main>
    );
  }

  return (
    <main className="page-pad">
      <div className="container">
        <div className="card" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h1 style={{margin:0}}>{user?.role === "admin" ? "Admin: Edit Event" : "Manager: Edit Event"}</h1>
          <button className="primary" onClick={onDelete} style={{background:"#c62828", borderColor:"#c62828"}}>Delete</button>
        </div>

        <form className="card form-grid" onSubmit={onSubmit}>
          <label>Title
            <input name="title" defaultValue={ev.title} required />
          </label>

          <label>Venue
            <input name="venue" defaultValue={ev.venue} required />
          </label>

          <label>Category
            <select name="category" defaultValue={ev.category} required>
              <option value="departmental">Departmental</option>
              <option value="non_departmental">Non-Departmental</option>
              <option value="outside">Outside the university</option>
            </select>
          </label>

          <label>Featured
            <select name="featured" defaultValue={String(ev.featured)}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </label>

          <label>Start time
            <input name="start_time" type="datetime-local"
                   defaultValue={ev.start_time?.slice(0,16)} required />
          </label>
          <label>End time
            <input name="end_time" type="datetime-local"
                   defaultValue={ev.end_time?.slice(0,16)} required />
          </label>

          <label style={{ gridColumn: "1 / -1" }}>Description (plain text)
            <textarea name="description_html" rows={8}
                      defaultValue={ev.description_html || ""} />
          </label>

          <label style={{ gridColumn: "1 / -1" }}>Online link (optional)
            <input name="online_link" type="url" defaultValue={ev.online_link || ""} />
          </label>

          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12, alignItems: "center" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input type="checkbox" checked={regChecked}
                     onChange={(e) => setRegChecked(e.target.checked)} />
              Registration
            </label>
            {regChecked && (
              <select value={regStatus} onChange={(e)=>setRegStatus(e.target.value)}>
                <option value="on">On</option>
                <option value="off">Off</option>
              </select>
            )}
          </div>

          {ev.cover_url && (
            <div style={{gridColumn:"1 / -1"}}>
              <img src={ev.cover_url} alt="" style={{maxWidth:360, borderRadius:12}} />
              <label style={{display:"inline-flex", alignItems:"center", gap:6, marginLeft:12}}>
                <input type="checkbox" checked={removeCover} onChange={e=>setRemoveCover(e.target.checked)} />
                Remove current cover
              </label>
            </div>
          )}

          <label style={{ gridColumn: "1 / -1" }}>Replace cover (optional)
            <input name="cover" type="file" accept="image/*" />
          </label>

          <label>Status
            <select name="status" defaultValue={ev.status || "draft"}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </label>

          <div style={{gridColumn:"1 / -1"}}>
            <button className="primary" disabled={saving}>{saving ? "Saving…" : "Save changes"}</button>
            {err && <span className="err" style={{marginLeft:10}}>{err}</span>}
          </div>
        </form>
      </div>
    </main>
  );
}
