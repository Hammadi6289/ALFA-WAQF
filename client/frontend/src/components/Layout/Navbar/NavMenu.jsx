import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router";
import { getUserData } from "../../../redux/actions/authActions";
import "./Navbar.css";
import specialtiesData from "../../../pages/Specialties/specialtiesData";
import logo from "../../../assets/alfaLogo.jpg";

const NavMenu = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [specialtiesDropdownOpen, setSpecialtiesDropdownOpen] = useState(false);

  const aboutRef = useRef(null);
  const specialtiesRef = useRef(null);

  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);

  // Close both dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (specialtiesRef.current && !specialtiesRef.current.contains(e.target)) {
        setSpecialtiesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeAll = () => {
    setIsOpen(false);
    setDropdownOpen(false);
    setSpecialtiesDropdownOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="navbar-backdrop"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <nav className="navbar navbar-expand-lg" aria-label="Main navigation">
        <div className="nav-inner">

          {/* ── Logo ── */}
          <NavLink to="/" className="nav-brand" onClick={closeAll} aria-label="Alfalah Home">
            <img
              className="nav-logo"
              src={logo}
              alt="Alfalah Hospital Logo"
            />
          </NavLink>

          {/* ── Mobile hamburger ── */}
          <button
            className={`nav-hamburger ${isOpen ? "nav-hamburger--open" : ""}`}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>

          {/* ── Collapsible menu ── */}
          <div className={`nav-collapse ${isOpen ? "nav-collapse--open" : ""}`}>

            {/* Left links */}
            <ul className="nav-links" role="menubar">

              <li role="none">
                <NavLink className="nav-link" to="/" onClick={closeAll} role="menuitem">
                  Home
                </NavLink>
              </li>

              <li role="none">
                <NavLink className="nav-link" to="/doctors" onClick={closeAll} role="menuitem">
                  Find a Doctor
                </NavLink>
              </li>

              {/* Specialities dropdown */}
              <li className="nav-has-dropdown" ref={specialtiesRef} role="none">
                <button
                  className="nav-link nav-dropdown-toggle"
                  onClick={() => {
                    setSpecialtiesDropdownOpen(!specialtiesDropdownOpen);
                    setDropdownOpen(false);
                  }}
                  aria-expanded={specialtiesDropdownOpen}
                  aria-haspopup="true"
                  role="menuitem"
                >
                  Specialities
                  <span className={`nav-chevron ${specialtiesDropdownOpen ? "nav-chevron--up" : ""}`} aria-hidden="true">
                    ›
                  </span>
                </button>
                <ul
                  className={`nav-dropdown nav-dropdown--wide ${specialtiesDropdownOpen ? "nav-dropdown--open" : ""}`}
                  role="menu"
                >
                  {specialtiesData.map((specialty) => (
                    <li key={specialty.id} role="none">
                      <NavLink
                        className="nav-dropdown-item"
                        to={`/specialties/${specialty.slug}`}
                        onClick={closeAll}
                        role="menuitem"
                      >
                        {specialty.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              {/* About Alfalah dropdown */}
              <li className="nav-has-dropdown" ref={aboutRef} role="none">
                <button
                  className="nav-link nav-dropdown-toggle"
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setSpecialtiesDropdownOpen(false);
                  }}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  role="menuitem"
                >
                  About Alfalah
                  <span className={`nav-chevron ${dropdownOpen ? "nav-chevron--up" : ""}`} aria-hidden="true">
                    ›
                  </span>
                </button>
                <ul
                  className={`nav-dropdown ${dropdownOpen ? "nav-dropdown--open" : ""}`}
                  role="menu"
                >
                  <li role="none">
                    <NavLink className="nav-dropdown-item" to="/gallery" onClick={closeAll} role="menuitem">
                      Virtual Tour
                    </NavLink>
                  </li>
                  <li role="none">
                    <NavLink className="nav-dropdown-item" to="/about" onClick={closeAll} role="menuitem">
                      Our Story
                    </NavLink>
                  </li>
                  <li role="none">
                    <NavLink className="nav-dropdown-item" to="/careers" onClick={closeAll} role="menuitem">
                      Careers
                    </NavLink>
                  </li>
                  <li role="none">
                    <NavLink className="nav-dropdown-item" to="/news" onClick={closeAll} role="menuitem">
                      News
                    </NavLink>
                  </li>
                  <li role="none">
                    <NavLink className="nav-dropdown-item" to="/contact" onClick={closeAll} role="menuitem">
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li role="none">
                <NavLink className="nav-link" to="/donate" onClick={closeAll} role="menuitem">
                  Help Deserving Patients
                </NavLink>
              </li>

              <li role="none">
                <span className="nav-link nav-link--disabled" aria-disabled="true" role="menuitem">
                  E-Reports
                  <span className="nav-coming-soon">Soon</span>
                </span>
              </li>
            </ul>

            {/* Right actions */}
            <div className="nav-actions">
              <NavLink to="/doctors" className="nav-book-btn" onClick={closeAll}>
                Book Appointment
              </NavLink>

              {user ? (
                <NavLink to="/user/profile" className="nav-account-btn" onClick={closeAll}>
                  <span className="nav-account-icon" aria-hidden="true">👤</span>
                  My Account
                </NavLink>
              ) : (
                <NavLink to="/login" className="nav-account-btn" onClick={closeAll}>
                  Login
                </NavLink>
              )}
            </div>

          </div>
        </div>
      </nav>
    </>
  );
};

export default NavMenu;
