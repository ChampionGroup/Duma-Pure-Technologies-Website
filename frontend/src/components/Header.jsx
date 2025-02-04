import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/Duma.png";


function Header() {
  return (
    <header className="header">
         <div className="logo-container">
        <img src={Logo} alt="Duma Pure Technologies Logo" className="logo-image" />
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
        <Link to="/" className="nav-link">
          Contact
        </Link>
        <Link to="/career" className="nav-link">
          Careers
        </Link>
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
      </nav>
    </header>
  );
}

export default Header;
