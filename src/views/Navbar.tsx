import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";
import { useAuth } from "../context/AuthContext"; // Import useAuth

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth(); // Lấy user từ context
  const role = user?.role; // Lấy role từ user
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Gym Manager 🏋️
        </Link>

        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>

        <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Home
            </NavLink>
          </li>

          {!isAuthenticated ? (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/signup"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Sign Up
                </NavLink>
              </li>
            </>
          ) : (
            <>
              {role === "ADMIN" && (
                <li>
                  <NavLink
                    to="/admin"
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    Admin
                  </NavLink>
                </li>
              )}
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <button className="logout-button" onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
