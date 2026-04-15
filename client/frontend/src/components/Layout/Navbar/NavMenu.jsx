import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { getUserData } from "../../../redux/actions/authActions";
import "./Navbar.css";
import specialtiesData from "../../../pages/Specialties/specialtiesData";

const NavMenu = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [specialtiesDropdownOpen, setSpecialtiesDropdownOpen] = useState(false);

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
            className={`collapse navbar-collapse align-items-baseline ${
              isOpen ? "show" : ""
            }`}
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

              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  onClick={() =>
                    setSpecialtiesDropdownOpen(!specialtiesDropdownOpen)
                  }
                  aria-expanded={specialtiesDropdownOpen}
                >
                  Specialities
                </button>
                <ul
                  className={`dropdown-menu specialties-dropdown ${
                    specialtiesDropdownOpen ? "show" : ""
                  }`}
                >
                  {specialtiesData.map((specialty) => (
                    <li key={specialty.id}>
                      <NavLink
                        className="dropdown-item"
                        to={`/specialties/${specialty.slug}`}
                        onClick={() => {
                          setIsOpen(false);
                          setSpecialtiesDropdownOpen(false);
                        }}
                      >
                        {specialty.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              {/* About Us Dropdown containing Gallery and Contact */}
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  aria-expanded={dropdownOpen}
                >
                  About Alfalah
                </button>
                <ul
                  className={`dropdown-menu about-us-containing-dropdown ${
                    dropdownOpen ? "show" : ""
                  }`}
                >
                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/gallery"
                      onClick={() => {
                        setIsOpen(false);
                        setDropdownOpen(false);
                      }}
                    >
                      Virtual Tour
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
                    <NavLink
                      className="dropdown-item"
                      to="/careers"
                      onClick={() => setIsOpen(false)}
                    >
                      Careers
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      className="dropdown-item"
                      to="/news"
                      onClick={() => setIsOpen(false)}
                    >
                      News
                    </NavLink>
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
                <NavLink
                  className="nav-link"
                  to="/donate"
                  onClick={() => setIsOpen(false)}
                >
                  Help Deserving Patients
                </NavLink>
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
