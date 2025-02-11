import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import axios from 'axios'; // Import axios
import { toast } from 'react-toastify'; // Import toast

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:4000';

  const checkAuth = async () => {
    try {
        const token = localStorage.getItem('token'); // Adjust this based on how you store your token
        const res = await axios.get(`${backendUrl}/api/auth/is-auth`, {
            headers: {
                Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
        });
        if (res.status === 200) {
            setUser(res.data);
        } else {
            console.error('Failed to fetch user data:', res.statusText);
        }
    } catch (err) {
        console.error('Auth check failed:', err);
    }
};

  const getUserInitials = () => {
    if (!user) return '';
    return `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Enhanced validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    // Reset error
    setError("");

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      console.log('Login successful:', response.data);
      toast.success("Login successful!"); // Show success toast
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Error during login:', error);
      setError("Invalid email or password. Please try again.");
      toast.error("Invalid email or password. Please try again."); // Show error toast
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div className="login-container page-container">
      {user ? (
        <div className="user-badge">
          <span className="user-initials">{getUserInitials()}</span>
        </div>
      ) : (
        <div>
          <button className="back-to-home" onClick={goToHome}>
            <FaArrowLeft /> Back to Home
          </button>

          <div className="login-card">
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Sign in to continue to your account</p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {error && <p className="error-message">{error}</p>}

              <div className="form-actions">
                <button type="submit" className="cta-button login-button">
                  Sign In
                </button>

                <div className="form-footer">
                  <Link to="/reset-password" className="forgot-password">
                    Forgot Password?
                  </Link>
                  <p className="signup-link">
                    Don't have an account? <Link to="/signup">Sign Up</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;