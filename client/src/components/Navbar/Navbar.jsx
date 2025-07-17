
import React from 'react';
import './Navbar.css';
import logo from '../../assets/Event Management Logo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
          <div className="navbar__logo">
            <img src={logo} alt="Event Management Logo" className="navbar__logo-img" />
          </div>
      <ul className="navbar__links">
        <li className="active">Home</li>
        <li>Events</li>
        <li>About Us</li>
        <li>Contact</li>
      </ul>
      <div className="navbar__actions">
        <button className="login-btn">Login</button>
        <button className="register-btn">Register</button>
      </div>
    </nav>
  )
};

export default Navbar;