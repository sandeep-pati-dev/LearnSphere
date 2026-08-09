import React, { useState } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Header = ({ isAuth }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="logo">
        Learn<span>Sphere</span>
      </div>

      <nav className="nav-links desktop-nav">
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/courses" onClick={closeMenu}>
          Courses
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About
        </Link>
        {isAuth ? (
          <Link to="/account" onClick={closeMenu}>
            Account
          </Link>
        ) : (
          <Link to="/login" onClick={closeMenu}>
            Login
          </Link>
        )}
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          <div className="menu-overlay" onClick={closeMenu}></div>
          <nav className="nav-links mobile-nav open">
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/courses" onClick={closeMenu}>
              Courses
            </Link>
            <Link to="/about" onClick={closeMenu}>
              About
            </Link>
            {isAuth ? (
              <Link to="/account" onClick={closeMenu}>
                Account
              </Link>
            ) : (
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>
            )}
          </nav>
        </>
      )}

      {/* Menu Icon */}
      <button
        className="menu-icon"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: "2rem",
          cursor: "pointer",
          padding: 0
        }}
      >
        <i className={`fa-solid ${isMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
      </button>
    </header>
  );
};

export default Header;
