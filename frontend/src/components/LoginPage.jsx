import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import axios from "axios"; // Import axios
import { toast } from "react-toastify"; // Import toast
import Logo from "../assets/Duma.png";
import Header from "./Header";
import { AppContext, AppContextProvider } from "../context/AppContext";
import LoadingSpinner from './LoadingSpinner';

function Login() {
  const { setIsLoggedin, getUserData } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can remove this setTimeout if you have actual data loading)
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token"); // Adjust this based on how you store your token
      const res = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      if (res.status === 200) {
        setUser(res.data);
      } else {
        console.error("Failed to fetch user data:", res.statusText);
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    }
  };

  const getUserInitials = () => {
    if (!user) return "";
    return `${user.firstName?.[0] || ""}${
      user.lastName?.[0] || ""
    }`.toUpperCase();
  };

  const handleResetPassword = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/reset-password`, { email });
      toast.success("Password reset email sent!");
    } catch (error) {
      toast.error("Error sending password reset email.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        email,
        password,
      });
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        await getUserData(); // Call getUserData after setting the token
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Invalid email or password. Please try again.");
      toast.error("Invalid email or password. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const goToHome = () => {
    navigate("/");
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="login-container page-container">
      {user ? (
        <div className="user-badge">
          <span className="user-initials">{getUserInitials()}</span>
        </div>
      ) : (
        <div>
          {/* <button className="back-to-home" onClick={goToHome}>
            <FaArrowLeft /> Back to Home
          </button> */}
          <Header />
          <div className="login-card">
            <div className="logo-container">
              <img src={Logo} alt="Logo" className="logo-image" />
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">
              Sign in to continue to your account
            </p>

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
                    {showPassword ? <FaEyeSlash /> : <FaEye />}a
                  </button>
                </div>
              </div>

              {error && <p className="error-message">{error}</p>}

              <div className="form-actions">
                <button type="submit" className="cta-button login-button">
                  Sign In
                </button>

                <div className="form-footer">
                  <button
                    onClick={handleResetPassword}
                    className="forgot-password"
                  >
                    Forgot Password?
                  </button>
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
