import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">BookMySlot</h2>
      <ul>
        <li><Link to="/">Appointments</Link></li>
        <li><Link to="/book">Book Now</Link></li>
        <li><Link to="/my-appointments">My Appointments</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
