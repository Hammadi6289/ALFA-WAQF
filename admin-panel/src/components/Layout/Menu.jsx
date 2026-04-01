import React from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiLogOut,
  FiMessageSquare,
} from "react-icons/fi";
import { RiPagesLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { useState } from "react";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("appData");
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/"); //login Page
  };
  // Add onClick to each NavLink for mobile
  const handleMobileClick = () => {
    if (window.innerWidth < 768) {
      onCloseMobile?.(); // Call parent function to close sidebar
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <h2 className="sidebar__title">Alfalah General Hospital</h2>
        <ul className="nav sidebar__nav">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link sidebar__link ${isActive ? "active" : ""}`
              }
              to={"/dashboard"}
              onClick={handleMobileClick}
            >
              <FiHome className="sidebar__icon" />
              <span>Dashboard</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link sidebar__link ${isActive ? "active" : ""}`
              }
              to={"/all-users"}
            >
              <FiUsers className="FiUsers" />
              <span>Users</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link sidebar__link ${isActive ? "active" : ""}`
              }
              to={"/all-doctors"}
            >
              <FiUserCheck className="FiUserCheck" />
              <span>Doctors</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link sidebar__link ${isActive ? "active" : ""}`
              }
              to={"/all-appointments"}
            >
              <FiCalendar className="FiCalendar" />
              <span>Appointments</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link sidebar__link ${isActive ? "active" : ""}`
              }
              to={"/all-web-messages"}
            >
              <FiMessageSquare className="FiMessageSquare" />
              <span>Messages</span>
            </NavLink>
          </li>

          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle sidebar__link"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
            >
              <RiPagesLine className="RiPagesLine" />
              Pages
            </button>
            <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
              <li>
                <NavLink
                  className="dropdown-item"
                  to="/admin/careers"
                  onClick={() => {
                    setIsOpen(false);
                    setDropdownOpen(false);
                  }}
                >
                  Careers
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="dropdown-item"
                  to="/events"
                  onClick={() => setIsOpen(false)}
                >
                  Events
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      {/* Logout button - separate from nav items */}
      <div className="sidebar__bottom">
        <button className="sidebar__logout" onClick={handleLogout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
