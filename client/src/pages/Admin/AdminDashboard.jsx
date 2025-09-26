import React, { useEffect, useState } from "react";
import "../Profile/Profile.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { adminStats, adminListUsers, adminAssignMgr, adminDeleteUser } from "../../api/profile";
import EventsList from "../../components/Events/EventsList.jsx";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [msg, setMsg] = useState(""); const [err, setErr] = useState("");

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) navigate("/login");
  }, [loading, user, navigate]);

  useEffect(() => {
    adminStats().then(setStats).catch(e => setErr(String(e)));
    adminListUsers().then(setUsers).catch(e => setErr(String(e)));
  }, []);

  async function makeManager(id) {
    setErr(""); setMsg("");
    try { await adminAssignMgr(id); setMsg("Role updated");
      const updated = await adminListUsers(); setUsers(updated);
    } catch(e){ setErr(String(e)); }
  }
  async function removeUser(id) {
    if (!confirm("Delete this user?")) return;
    setErr(""); setMsg("");
    try { await adminDeleteUser(id); setMsg("User deleted");
      const updated = await adminListUsers(); setUsers(updated);
    } catch(e){ setErr(String(e)); }
  }

  return (
    <main className="page-pad">
      <div className="container">
        {/* Title + Upload button */}
        <div className="card" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <h1 style={{margin:0}}>Admin Dashboard</h1>
          <Link className="primary" to="/dashboard/admin/events/new">+ Upload Event</Link>
        </div>

        <section className="card">
          <h3>Stats</h3>
          {!stats ? <p>Loading…</p> : (
            <ul>
              <li>Total users: <b>{stats.users_total}</b></li>
              <li>Admins: <b>{stats.admins}</b></li>
              <li>Managers: <b>{stats.managers}</b></li>
              <li>Students: <b>{stats.students}</b></li>
              <li>Events: <b>{stats.events}</b> (coming later)</li>
            </ul>
          )}
        </section>

        <section className="card">
          <h3 class= "usr">Users</h3>
          {msg && <p className="ok">{msg}</p>}
          {err && <p className="err">{err}</p>}
          <div style={{overflowX:"auto"}}>
            <table style={{width:"100%", borderCollapse:"collapse"}}>
              <thead>
                <tr>
                  <th style={{textAlign:"left"}}>ID</th>
                  <th style={{textAlign:"left"}}>Username</th>
                  <th style={{textAlign:"left"}}>Email</th>
                  <th style={{textAlign:"left"}}>Role</th>
                  <th style={{textAlign:"left"}}>Student ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.username}</td>
                    <td>{u.email || "-"}</td>
                    <td>{u.role || "-"}</td>
                    <td>{u.student_id || "-"}</td>
                    <td style={{textAlign:"center"}}>
                      <button className="primary" onClick={()=>makeManager(u.id)} disabled={u.role==="admin"}>Assign manager</button>
                      <button className="primary" onClick={()=>removeUser(u.id)} disabled={u.role==="admin"} style={{marginLeft:8, background:"#c62828", borderColor:"#c62828"}}>Delete</button>
                    </td>
                  </tr>
                ))}
                {!users.length && <tr><td colSpan="6">No users yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        {/* Events list for admins */}
        <section>
          <EventsList mineDefault={false} />
        </section>
      </div>
    </main>
  );
}
