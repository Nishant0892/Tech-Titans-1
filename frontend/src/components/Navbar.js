import React from "react";
import { NavLink } from "react-router-dom";
import "./../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Home
      </NavLink>
      <NavLink to="/inventory" className="nav-link">
        Inventory
      </NavLink>
      <NavLink to="/staff" className="nav-link">
        Staff
      </NavLink>
      <NavLink to="/surveillance" className="nav-link">
        Surveillance
      </NavLink>
    </nav>
  );
}

export default Navbar;
