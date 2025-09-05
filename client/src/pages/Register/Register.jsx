import React, { useState } from "react";
import "../Login/Login.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); setMsg(""); setLoading(true);
    const f = new FormData(e.currentTarget);
    const username  = f.get("username");
    const studentId = f.get("studentId");
    const email     = f.get("email");
    const password  = f.get("password");
    const confirm   = f.get("confirm");

    if (password !== confirm) { setErr("Passwords do not match"); setLoading(false); return; }

    try {
      await register({ username, studentId, email, password });
      setMsg("Registered & logged in!");
      navigate("/");
    } catch (e2) { setErr(e2.message || "Registration failed"); }
    finally { setLoading(false); }
  }

  return (
    <main className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Student Registration</h1>
          <form className="auth-form" onSubmit={onSubmit}>
            <input name="username" placeholder="Username" required />
            <input name="studentId" placeholder="Student ID" required />
            <input name="email" type="email" placeholder="Email (optional)" />
            <input name="password" type="password" placeholder="Password" required />
            <input name="confirm" type="password" placeholder="Confirm password" required />
            <button disabled={loading}>{loading ? "Creating..." : "Register"}</button>
          </form>
          {msg && <p className="auth-msg">{msg}</p>}
          {err && <p className="auth-error">{err}</p>}
          <p style={{marginTop:10}}>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </main>
  );
}
