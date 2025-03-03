import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "../App.css"
import Logo from "../assets/Duma.png";
import Header from "./Header";
import "../EmailVerify.css";

const EmailVerify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
  const navigate = useNavigate();
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("userId"); // Get userId from query params

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/auth/verify-email`, {
        userId,
        otp,
      });
      if (response.data.success) {
        toast.success("Email verified successfully!");
        navigate("/login"); // Redirect to login page after successful verification
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Error during email verification:", error);
      setError("Verification failed. Please try again.");
    }
  };

  return (
    <div className="email-verify-container">
      <Header />
      <div className="logo2-container">
          <img src={Logo} alt="Logo" className="logo-image" />
        </div>
      <h2>Email Verification</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="email-verify-form">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter verification code"
          required
          className="form-input"
        />
        <button type="submit" className="cta-button verify-button">
          Verify
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
