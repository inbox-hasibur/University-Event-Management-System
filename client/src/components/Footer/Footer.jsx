import React from 'react';
import './Footer.css';
import logo from '../../assets/Event Management Logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <img src={logo} alt="IUBAT Event Management" className="footer__logo" />
          <div className="footer__brand-content">
            <p className="footer__tagline">
              Empowering students to connect with university-wide opportunities
              and grow beyond classrooms.
            </p>
            <div className="footer__address">
              <p>IUBAT University</p>
              <p>Uttara Model Town,</p>
              <p>Dhaka-1230, Bangladesh</p>
            </div>
          </div>
        </div>

        <div className="footer__links">
          <div className="footer__links-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#">Main Website</a></li>
              <li><a href="#">Global Events</a></li>
              <li><a href="#">Featured Events</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer__links-section">
            <h3>Others</h3>
            <ul>
              <li><a href="#">Term & Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Get in Touch</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__social">
          <a href="#" className="social-link">Website</a>
          <a href="#" className="social-link">Facebook</a>
          <a href="#" className="social-link">LinkedIn</a>
        </div>
        <p className="footer__copyright">
          © 2025 IUBAT University Event Management System. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
