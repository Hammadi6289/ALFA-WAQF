import React, { Children, useState } from "react";
import Menu from "./Menu";
import Footer from "./Footer";
import { FiMenu, FiX } from "react-icons/fi";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="admin-layout">
      {/* Mobile Burger Menu */}
      <button
        className="sidebar-toggle-btn d-md-none"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiX size={34} /> : <FiMenu size={34} />}
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay d-md-none"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="row g-0">
        <div
          className={`col-lg-2 sidebar-column ${
            sidebarOpen ? "sidebar-open" : ""
          }`}
        >
          <Menu />
        </div>

        {/* Content Column */}
        <div className="col-12 col-lg-10 admin-content">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
