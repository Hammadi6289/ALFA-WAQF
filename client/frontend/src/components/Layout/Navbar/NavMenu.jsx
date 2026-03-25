import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { getUserData } from "../../../redux/actions/authActions";
import "./Navbar.css";

const NavMenu = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      {/* Make the navbar take full screen on smaller screens */}
      {isOpen && (
        <div className="navbar-backdrop" onClick={() => setIsOpen(false)} />
      )}

      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarTogglerDemo01"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/doctors"
                  onClick={() => setIsOpen(false)}
                >
                  Find a Doctor
                </NavLink>
              </li>

              {/* About Us Dropdown containing Gallery and Contact */}
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="/about"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  // onClick={() => setIsOpen(false)}
                >
                  About Alfalah
                </NavLink>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/gallery"
                      onClick={() => setIsOpen(false)}
                    >
                      Gallery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/about"
                      onClick={() => setIsOpen(false)}
                    >
                      Our Story
                    </NavLink>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/contact"
                      onClick={() => setIsOpen(false)}
                    >
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link disabled" aria-disabled="true">
                  E-Reports
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <a
                href="/doctors"
                className="btn btn-outline-success"
                type="submit"
              >
                Book an Appointment
              </a>
            </form>
            {/* Login user? profile */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {user ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/user/profile"
                    onClick={() => setIsOpen(false)}
                  >
                    My Account
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/login"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavMenu;
