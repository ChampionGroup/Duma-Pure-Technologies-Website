import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Duma.png";
import {
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";

function Header() {
  const { userData, setIsLoggedin, setUserData } = useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    // Logic to sign out the user
    setUserData(null);
    setIsLoggedin(false);
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <FaBars />
      </button>
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <button className="close-menu" onClick={toggleMobileMenu}>
            <FaTimes />
          </button>
          <nav>
            <a href="#services" onClick={toggleMobileMenu}>
              Services
            </a>
            <a href="#solutions" onClick={toggleMobileMenu}>
              Solutions
            </a>
            <a href="#about" onClick={toggleMobileMenu}>
              About
            </a>
            <a href="#contact" onClick={toggleMobileMenu}>
              Contact
            </a>
            {userData ? (
              <div>
                <span>{userData.firstName[0].toUpperCase()}</span> {/* Display initials */}
                <button onClick={handleSignOut}>Sign Out</button>
              </div>
            ) : (
              <>
                <button className="login-button">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </button>
                <button className="login-button">
                  <Link to="/signup" className="nav-link">
                    Signup
                  </Link>
                </button>
              </>
            )}
          </nav>
        </div>
      </div>
      <header className="header">
        <div className="logo-container">
          <img src={Logo} alt="Duma Pure Technologies Logo" className="logo-image" />
          <span className="logo-text">Duma Pure Technologies</span>
        </div>
        <nav className="navigation">
          <Link to="/" className="nav-link" onClick={() => {
            document.getElementById("hero").scrollIntoView({
              behavior: "smooth",
            });
          }}>
            Home
          </Link>
          <Link to="/services" className="nav-link" onClick={() => {
            document.getElementById("services").scrollIntoView({
              behavior: "smooth",
            });
          }}>
            Services
          </Link>
          <Link to="/solutions" className="nav-link" onClick={() => {
            document.getElementById("solutions").scrollIntoView({
              behavior: "smooth",
            });
          }}>
            Solutions
          </Link>
          <Link to="/" className="nav-link" onClick={() => {
            document.getElementById("contact").scrollIntoView({
              behavior: "smooth",
            });
          }}>
            Contact
          </Link>
          <Link to="/career" className="nav-link" onClick={() => {
            document.getElementById("career").scrollIntoView({
              behavior: "smooth",
            });
          }}>
            Careers
          </Link>
          {userData ? (
            <div>
              <span>{userData.firstName[0].toUpperCase()}</span> {/* Display initials */}
              <button onClick={handleSignOut}>Sign Out</button>
            </div>
          ) : (
            <>
            <button className="login-button">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </button>
            <button className="login-button">
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </button>
            </>
          )}
        </nav>
      </header>
    </>
  );
}

export default Header;