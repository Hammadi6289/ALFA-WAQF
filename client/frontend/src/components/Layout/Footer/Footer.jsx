import React from "react";
import "./Footer.css";
import { Link, useNavigate } from "react-router";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand / About */}
        <div className="footer-section">
          <h3 className="footer-logo">ALFA WAQF</h3>
          <p className="footer-text">
            A platform dedicated to care, compassion, and community wellbeing.
          </p>
        </div>

        {/* Navigation */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h4 className="footer-title">Follow Us</h4>
          <div className="footer-social">
            <Link
              to="https://www.facebook.com/p/Alfalah-General-Hospital-B17-Islamabad-61572901477675/"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </Link>
            <a href="#" aria-label="Twitter">
              <i className="fa-brands fa-x-twitter"></i>
            </a>
            <Link
              to="https://www.instagram.com/alfalahgeneralhospitalb17/?hl=en"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </Link>
            <Link to="https://www.linkedin.com/feed/" aria-label="LinkedIn">
              <i className="fa-brands fa-linkedin-in"></i>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Alfalah General Hospital. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
