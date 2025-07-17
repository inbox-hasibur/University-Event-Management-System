import React from 'react';
import './Navbar.css';
import logo from '../../assets/Event Management Logo.png';

const Navbar = () => {
  return (
    <header className="header">
      <div className="navbar-container">
        <div className="navbar__main">
          <div className="navbar__brand">
            <img src={logo} alt="Event Management Logo" className="navbar__logo-img" />
          </div>
          <ul className="navbar__links">
            <li className="active">Home</li>
            <li>Events</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="navbar__auth">
          <button className="login-btn">Login</button>
          <button className="register-btn">Register</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;