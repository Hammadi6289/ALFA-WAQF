import React from "react";
import Topbar from "./Topbar";
import NavMenu from "./NavMenu";

const Navbar = () => {
  return (
    <header className="navbar-container sticky-top">
      <Topbar />
      <NavMenu />
    </header>
  );
};

export default Navbar;
