import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import "../App.css"; 
import { AppContext } from "../context/AppContext";
import { toast } from 'react-toastify';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    projectScope: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
  const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      companyName,
      projectScope,
    } = formData;

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

    // Prepare the data to send
    const data = {
      firstName,
      lastName,
      email,
      password,
      companyName,
      projectScope,
    };

    try {
      const response = await axios.post(`http://localhost:4000/api/auth/signup`, data);
      console.log('Signup successful:', response.data);
      setIsLoggedin(true);
      toast.success("Signup successful!"); // Show success toast
      getUserData();
      navigate('/login');
    } catch (error) {
      console.error('Error during signup:', error);
      setError("An error occurred during signup. Please try again.");
      toast.error("An error occurred during signup. Please try again."); // Show error toast
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
      <div className="login-card">
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
        <label htmlFor="companyName">Company Name</label>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          required
          className="form-input"
        />
        <label htmlFor="projectScope">Project Scope</label>
        <input
          type="text"
          name="projectScope"
          placeholder="Project Scope"
          value={formData.projectScope}
          onChange={handleChange}
          required
          className="form-input"
        />
        <button type="submit" className="cta-button signup-button">Sign Up</button>
        </div>
      </form>
      <div className="signup-link">
      <p className="signup-text">Already have an account?</p>
      <Link to="/login" >
        <FaArrowLeft /> Back to Login
      </Link>
      </div>
    </div>
    </div>
  );
}

export default Signup;