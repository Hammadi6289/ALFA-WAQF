import React from "react";

const Footer = () => {
  return (
    <footer className="admin-footer">
      <div className="admin-footer__left">
        © {new Date().getFullYear()} Alfalah General Hospital
      </div>

      <div className="admin-footer__right">
        <span>Admin Panel</span>
        <span className="dot"> • </span>
        <span>All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
