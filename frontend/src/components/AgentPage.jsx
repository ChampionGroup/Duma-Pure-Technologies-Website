import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

function AgentPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    businessName: '',
    agentType: '',
    experience: '',
    additionalDetails: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Agent Application Submitted:', formData);
    alert('Thank you for your agent application! We will review it shortly.');
  };

  return (
    <div className="agent-page">
      <Header />
      <div className="form-page">
        <div className="form-container">
          <h2>Become an Agent</h2>
          <form onSubmit={handleSubmit} className="agent-form">
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
                <label htmlFor="businessName">Business Name</label>
                <input 
                  type="text" 
                  id="businessName" 
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="agentType">Agent Type</label>
                <select 
                  id="agentType" 
                  name="agentType"
                  value={formData.agentType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Agent Type</option>
                  <option value="sales">Sales Agent</option>
                  <option value="marketing">Marketing Agent</option>
                  <option value="referral">Referral Agent</option>
                  <option value="technical">Technical Agent</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label htmlFor="experience">Years of Experience</label>
                <input 
                  type="number" 
                  id="experience" 
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                  max="50"
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="additionalDetails">Additional Details</label>
                <textarea 
                  id="additionalDetails" 
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us more about your background and interests..."
                ></textarea>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">Submit Agent Application</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AgentPage;