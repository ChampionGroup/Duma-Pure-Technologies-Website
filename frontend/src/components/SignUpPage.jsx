import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import "../App.css";
import { toast } from 'react-toastify';
import axios from 'axios';
import Header from "./Header";
import LoadingSpinner from './LoadingSpinner';
import Logo from "../assets/Duma.png";

function Signup() {
  // Move all hooks to the top level
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

  useEffect(() => {
    // Simulate loading time (you can remove this setTimeout if you have actual data loading)
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Validate input
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
  
    try {
      const response = await axios.post(`${backendUrl}/api/auth/signup`, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      console.log('Signup successful:', response.data);
      toast.success("Signup successful! Please verify your email.");
      navigate(`/email-verify?userId=${response.data.userId}`); // Redirect to verification page
    } catch (error) {
      console.error('Error during signup:', error);
      if (error.response) {
        console.error('Server Response:', error.response.data);
        setError(error.response.data.message || "An error occurred during signup. Please try again.");
      } else {
        setError("An error occurred during signup. Please try again.");
      }
      toast.error("An error occurred during signup. Please try again.");
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="signup-container">
      <Header/>
      <div className="login-card">
        <div className="logo2-container">
          <img src={Logo} alt="Logo" className="logo-image" />
        </div>
        <h2 className="signup-title">Sign Up</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="form-input"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="form-input"
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
            />
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
              />
              <button className="eye-button" type="button" onClick={() => togglePasswordVisibility("password")}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="form-input"
              />
              <button className="eye-button" type="button" onClick={() => togglePasswordVisibility("confirmPassword")}>
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" className="cta-button signup-button">Sign Up</button>
          </div>
        </form>
        <div className="signup-link">
          <p className="signup-text">Already have an account?</p>
          <Link to="/login">
            <FaArrowLeft /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;