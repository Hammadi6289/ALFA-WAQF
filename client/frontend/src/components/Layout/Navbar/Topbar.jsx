import React from "react";
import "./Topbar.css";

const Topbar = () => {
  return (
    <div className="topbar-container">
      <div className="topbar-content">
        <div className="topbar-left">
          <a href="tel:05127657700" className="topbar-link">
            <i className="fa-solid fa-phone-volume"></i>
            Emergency: (051) 2765700
          </a>
          <span className="topbar-divider">|</span>
          <span className="topbar-link">
            <i className="fa-solid fa-clock"></i>
            24/7 Available
          </span>
        </div>

        <div className="topbar-right">
          <a href="mailto:alfalahhospb17@gmail.com" className="topbar-email">
            <i className="fa-solid fa-envelope"></i>
            alfalahhospb17@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
