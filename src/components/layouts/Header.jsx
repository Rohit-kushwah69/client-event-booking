import React, { useContext, useState } from 'react';
import "../../assets/header.css";
import { AuthContext } from '../../context/AuthContext';
import { useNavigate, NavLink } from "react-router-dom";

const Header = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header id="mainHeader" className="biller-header py-3 shadow-lg">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          {/* Logo */}
          <div className="col-6 col-md-3">
            <h2 className="site-title m-0">
              <NavLink to="/" className="text-white text-decoration-none">
                BlueEvent
              </NavLink>
            </h2>
          </div>

          {/* Toggle Button */}
          <div className="col-6 col-md-9 text-end">
            <button
              className="navbar-toggler d-md-none text-white border-0"
              type="button"
              onClick={toggleNavbar}
              aria-controls="navbarNav"
              aria-expanded={!isCollapsed}
              aria-label="Toggle navigation"
            >
              <i className="fa-solid fa-sliders fa-lg"></i>
            </button>

            {/* Nav Links */}
            <nav
              className={`navbar-collapse ${isCollapsed ? "d-none d-md-flex" : "d-block"} mt-3 mt-md-0`}
              id="navbarNav"
            >
              <ul className={`navbar-nav ${isCollapsed ? "" : "bg-dark p-3 rounded"} 
                ms-auto text-start text-md-end d-flex flex-column flex-md-row gap-3 justify-content-md-end`}>

                {/* Main Nav Items */}
                <li className="nav-item">
                  <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/event" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Events</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/contact" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contact Us</NavLink>
                </li>

                {/* Auth Links */}
                {!user ? (
                  <>
                    <li className="nav-item">
                      <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Login</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Register</NavLink>
                    </li>
                  </>
                ) : (
                  <li className="nav-item dropdown">
                    <button
                      className="btn btn-outline-primary text-white dropdown-toggle"
                      type="button"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {user?.name || "Account"}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                      <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                      {user?.role === "user" && (
                        <li><NavLink className="dropdown-item" to="/my-bookings">My Bookings</NavLink></li>
                      )}
                      {user?.role === "admin" && (
                        <li><NavLink className="dropdown-item" to="/admin/dashboard">Dashboard</NavLink></li>
                      )}
                      <li><NavLink className="dropdown-item" to="/change-password">Change Password</NavLink></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button></li>
                    </ul>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
