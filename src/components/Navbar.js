import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaCog } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext"; 
import "./styles.css";

const Navbar = () => {
  const { user, logout } = useAuth(); 
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <h2 className="logo">BookMySlot</h2>
      <ul>
        <li><Link to="/">Appointments</Link></li>
        <li><Link to="/book">Book Now</Link></li>
        <li><Link to="/my-appointments">My Appointments</Link></li>
      </ul>
      <div className="user-dropdown">
        {user ? (
          <div className="dropdown-container">
            <button className="dropdown-button" onClick={handleDropdownToggle}>
              <FaUserCircle size={30} />
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                {user.role === 'admin' ? (
                  <>
                    <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                    <li><Link to="/admin/manage-appointments">Manage Appointments</Link></li>
                    <li><Link to="/admin/manage-users">Manage Users</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/my-profile">My Profile</Link></li>
                    <li><Link to="/settings"><FaCog /> Settings</Link></li>
                  </>
                )}
                <li><button onClick={logout}><FaSignOutAlt /> Logout</button></li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
