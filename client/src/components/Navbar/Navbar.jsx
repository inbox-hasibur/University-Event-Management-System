import React from 'react';
import './Navbar.css';
import logo from '../../assets/Event Management Logo.png';
import { NavLink, useNavigate, useMatch } from 'react-router-dom';

function LiNavLink({ to, end = false, children }) {
  // mark the <li> active (so your existing .active styles still apply)
  const match = useMatch({ path: to, end });
  return (
    <li className={match ? 'active' : ''}>
      <NavLink to={to} end={end}>
        {children}
      </NavLink>
    </li>
  );
}

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="navbar-container">
        <div className="navbar__main">
          <div
            className="navbar__brand"
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' ? navigate('/') : null)}
          >
            <img src={logo} alt="Event Management Logo" className="navbar__logo-img" />
          </div>

          <ul className="navbar__links">
            <LiNavLink to="/" end>Home</LiNavLink>
            <LiNavLink to="/events">Events</LiNavLink>
            <LiNavLink to="/about">About Us</LiNavLink>
            <LiNavLink to="/contact">Contact</LiNavLink>
          </ul>
        </div>

        <div className="navbar__auth">
          <button className="login-btn" onClick={() => navigate('/login')}>Login</button>
          <button className="register-btn" onClick={() => navigate('/register')}>Register</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
