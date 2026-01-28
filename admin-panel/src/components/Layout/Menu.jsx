import React from "react";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiUserCheck,
  FiCalendar,
  FiLogOut,
} from "react-icons/fi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slice/authSlice";

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.removeItem("appData");
    dispatch(logout());
    toast.success("Logged out successfully");
    navigate("/"); //login Page
  };

  return (
    <div className="sidebar">
      <h2 className="sidebar__title">Admin Panel</h2>
      <ul className="nav sidebar__nav">
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              `nav-link sidebar__link ${isActive ? "active" : ""}`
            }
            to={"/dashboard"}
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
        <button className="sidebar__logout" onClick={handleLogout}>
          <FiLogOut />
          <span>Logout</span>
        </button>
      </ul>
    </div>
  );
};

export default Menu;
