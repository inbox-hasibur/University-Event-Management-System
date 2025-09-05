import React, { useState } from "react";
import "./Login.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("student");
  const [msg, setMsg] = useState(""); const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setMsg(""); setLoading(true);
    const f = new FormData(e.currentTarget);
    const email     = f.get("email") || undefined;
    const studentId = f.get("studentId") || undefined;
    const password  = f.get("password");

    // validation: students need email OR ID; managers/admins need email
    if (role === "student" && !email && !studentId) {
      setErr("Provide Email or Student ID"); setLoading(false); return;
    }
    if ((role === "manager" || role === "admin") && !email) {
      setErr("Managers/Admins must use Email"); setLoading(false); return;
    }

    try {
      await login({ role, email, studentId, password });
      setMsg("Logged in!"); navigate("/");
    } catch (e) { setErr(e.message || "Login failed"); }
    finally { setLoading(false); }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Login</h1>
          <form className="auth-form" onSubmit={onSubmit}>
            <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>

            <input name="email" type="email" placeholder="Email" disabled={role==="student" ? false : false /* keep enabled for all */} />
            <input name="studentId" placeholder="Student ID" disabled={role !== "student"} />

            <input name="password" type="password" placeholder="Password" required />
            <button disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
          </form>
          <p className="help" style={{marginTop:10}}>
            Students can use <b>Email or Student ID</b>. Managers/Admins must use <b>Email</b>.
          </p>
          {msg && <p className="auth-msg">{msg}</p>}
          {err && <p className="auth-error">{err}</p>}
          <p style={{marginTop:10}}>No account? <Link to="/register">Register as Student</Link></p>
        </div>
      </div>
    </main>
  );
}
