import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Duma.png";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

function Header() {
  const { userData, setIsLoggedin, setUserData, getUserData } =
    useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check auth status when component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !userData) {
      getUserData();
    }
  }, []);

  // Function to get user initials
  const getUserInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      const initials =
        `${userData.firstName[0]}${userData.lastName[0]}`.toUpperCase();
      console.log("User initials:", initials); // 🔥 Log initials
      return initials;
    }
    if (userData?.firstName) {
      const initials = userData.firstName[0].toUpperCase();
      console.log("User initials:", initials); // 🔥 Log initials if only firstName exists
      return initials;
    }
    console.log("User initials: Not available"); // 🔥 Log if no name is found
    return "";
  };

  // Debugging: Log userData when it changes
  useEffect(() => {
    console.log("Updated userData:", userData);
    console.log("Extracted initials:", getUserInitials());
  }, [userData]);

  // Handle sign-out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUserData(null);
    setIsLoggedin(false);
    toast.success("Signed out successfully");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <FaBars />
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <button
            className="close-menu"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <FaTimes />
          </button>
          <nav>
            <a href="#services" onClick={() => setIsMobileMenuOpen(false)}>
              Services
            </a>
            <a href="#solutions" onClick={() => setIsMobileMenuOpen(false)}>
              Solutions
            </a>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>
              About
            </a>
            <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </a>

            {userData ? (
              <div className="user-profile">
                <span className="user-initials">{getUserInitials()}</span>
                <button onClick={handleSignOut} className="signout-button">
                  <FaSignOutAlt style={{ marginRight: "5px" }} /> Sign Out
                </button>
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

      {/* Main Header */}
      <header className="header">
        <div className="logo-container">
          <img
            src={Logo}
            alt="Duma Pure Technologies Logo"
            className="logo-image"
          />
          <span className="logo-text">Duma Pure Technologies</span>
        </div>
        <nav className="navigation">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/services" className="nav-link">
            Services
          </Link>
          <Link to="/solutions" className="nav-link">
            Solutions
          </Link>
          <Link
            to="/"
            className="nav-link"
            onClick={() => {
              document.getElementById("contact").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            Contact
          </Link>
          <Link to="/career" className="nav-link">
            Careers
          </Link>

          <div className="auth-section">
            {userData ? (
              <div className="user-profile">
                <span className="user-initials">{getUserInitials()}</span>
                <button onClick={handleSignOut} className="signout-button">
                  <FaSignOutAlt style={{ marginRight: "5px" }} /> Sign Out
                </button>
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
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
