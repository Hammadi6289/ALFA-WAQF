import React from "react";
import Topbar from "./Topbar";
import NavMenu from "./NavMenu";
import { NavLink } from "react-router";
import logo from "../../../assets/alfaLogo.jpg";

const Navbar = () => {
  return (
    <>
      <div className="navbar-container sticky-top">
        <div className="row">
          {/* <div className="col-md-1">
            <NavLink to="/">
              <img className="alfa-brand-logo" src={logo} alt="alfalah-logo" />
            </NavLink>
          </div> */}
          <div className="col-md-12">
            <div>
              <Topbar />
            </div>
            <div>
              <NavMenu />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
