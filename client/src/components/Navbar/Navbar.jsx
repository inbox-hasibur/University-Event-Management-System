import React from "react";
import "./Navbar.css";
import logo from "../../assets/Event Management Logo.png";
import { NavLink, useNavigate, useMatch } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function LiNavLink({ to, end = false, children }) {
  const match = useMatch({ path: to, end });
  return (
    <li className={match ? "active" : ""}>
      <NavLink to={to} end={end}>{children}</NavLink>
    </li>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const { user, loading, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();          // POST /api/auth/logout/
    } catch (e) {
      console.error("Logout failed:", e);
    } finally {
      navigate("/");           // go home after logout
    }
  }

  return (
    <header className="header">
      <div className="navbar-container">
        <div className="navbar__main">
          <button
            className="navbar__brand"
            onClick={() => navigate("/")}
            aria-label="Go to Home"
          >
            <img src={logo} alt="Event Management Logo" className="navbar__logo-img" />
          </button>

          <ul className="navbar__links">
            <LiNavLink to="/" end>Home</LiNavLink>
            <LiNavLink to="/events">Events</LiNavLink>
            <LiNavLink to="/about">About Us</LiNavLink>
            <LiNavLink to="/contact">Contact</LiNavLink>
          </ul>
        </div>

        <div className="navbar__auth">
          {loading ? null : !user ? (
            <>
              <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
              <button className="register-btn" onClick={() => navigate("/register")}>Register</button>
            </>
          ) : (
            <>
              <span className="navbar__user">Hi, <b>{user.username}</b></span>
              <button type="button" className="profile-btn" onClick={() => navigate("/profile")}>Profile</button>
              <button type="button" className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
