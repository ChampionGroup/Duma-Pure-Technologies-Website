import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft, FaFileUpload } from "react-icons/fa";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    projectScope: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const navigate = useNavigate();

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Additional file validation
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File size should not exceed 5MB");
        return;
      }
      setFormData((prevState) => ({
        ...prevState,
        projectScope: file,
      }));
    }
  };

  const handleSubmit = (e) => {
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

    // Validation checks
    if (!firstName.trim()) {
      setError("First name is required");
      return;
    }

    if (!lastName.trim()) {
      setError("Last name is required");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password.trim()) {
      setError("Password is required");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (passwordStrength < 3) {
      setError(
        "Password is too weak. Include uppercase, lowercase, numbers, and symbols."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!companyName.trim()) {
      setError("Company Name is required");
      return;
    }

    if (!projectScope) {
      setError("Project Scope PDF is required");
      return;
    }

    // Validate PDF file
    if (projectScope.type !== "application/pdf") {
      setError("Please upload a valid PDF file");
      return;
    }

    // Reset error
    setError("");

    // Perform signup logic here
    console.log("Signup submitted", {
      firstName,
      lastName,
      email,
      companyName,
      projectScopeFileName: projectScope.name,
    });
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="signup-container page-container">
      <button className="back-to-home" onClick={goToHome}>
        <FaArrowLeft /> Back to Home
      </button>

      <div className="signup-card">
        <h1 className="signup-title">Create Your Account</h1>
        <p className="signup-subtitle">Join our platform and get started</p>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-input"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-input"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                className="form-input"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility("password")}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="password-strength">
              <div
                className={`strength-bar strength-${passwordStrength}`}
                style={{ width: `${(passwordStrength / 5) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => togglePasswordVisibility("confirmPassword")}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              className="form-input"
              placeholder="Enter your company name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="projectScope">Project Scope (PDF)</label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="projectScope"
                name="projectScope"
                className="file-input"
                accept=".pdf"
                onChange={handleFileChange}
                required
              />
              <label htmlFor="projectScope" className="file-input-label">
                <FaFileUpload />
                {formData.projectScope
                  ? `Selected: ${formData.projectScope.name}`
                  : "Upload Project Scope PDF"}
              </label>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button type="submit" className="cta-button signup-button">
              Sign Up
            </button>

            <div className="form-footer">
              <p className="login-link">
                Already have an account? <Link to="/login">Log In</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
