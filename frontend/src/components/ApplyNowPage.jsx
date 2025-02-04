import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import Header from "./Header";
import Footer from "./Footer";

function ApplyNowPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
    resume: null,
    coverLetter: "",
    linkedinProfile: "",
  });

  const jobPositions = [
    "Software Engineer",
    "UX/UI Designer",
    "Data Analyst",
    "Project Manager",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log("Application submitted:", formData);
    alert("Thank you for your application! We will review it shortly.");
  };

  return (
    <div className="apply-now-page">
      <Header />
      <div className="application-container">
        <h2>Apply Now</h2>
        <form onSubmit={handleSubmit} className="job-application-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
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
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position Applied For</label>
              <select
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              >
                <option value="">Select Position</option>
                {jobPositions.map((position, index) => (
                  <option key={index} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="linkedinProfile">
                LinkedIn Profile (Optional)
              </label>
              <input
                type="url"
                id="linkedinProfile"
                name="linkedinProfile"
                value={formData.linkedinProfile}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>
            <div className="form-group full-width">
              <label htmlFor="resume">Upload Resume</label>
              <input
                type="file"
                id="resume"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                required
              />
              <small>Accepted formats: PDF, DOC, DOCX (Max 5MB)</small>
            </div>
            <div className="form-group full-width">
              <label htmlFor="coverLetter">Cover Letter</label>
              <textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="5"
                placeholder="Tell us why you're the perfect fit for this role..."
                required
              ></textarea>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="submit-btn">
              Submit Application
            </button>
            <Link to="/career" className="cancel-btn">
              Cancel
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default ApplyNowPage;
