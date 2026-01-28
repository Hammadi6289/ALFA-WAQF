import React, { Children } from "react";
import Menu from "./Menu";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="admin-layout">
      <div className="row g-0">
        <div className="col-md-2">
          <Menu />
        </div>

        <div className="col-md-10 admin-content">
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
