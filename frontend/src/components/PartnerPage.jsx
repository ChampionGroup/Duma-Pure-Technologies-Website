import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

function PartnerPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: '',
    partnershipInterest: '',
    companyWebsite: '',
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
    // TODO: Implement form submission logic
    console.log('Partnership Application Submitted:', formData);
    alert('Thank you for your partnership application! We will review it shortly.');
  };

  return (
    <div className="partner-page">
      <Header />
      <div className="form-page">
        <div className="form-container">
          <h2 className="text-center mb-4">Become a Partner</h2>
          <form onSubmit={handleSubmit} className="partnership-form">
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="companyName">Company Name</label>
                <input 
                  type="text" 
                  id="companyName" 
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactPerson">Contact Person</label>
                <input 
                  type="text" 
                  id="contactPerson" 
                  name="contactPerson"
                  value={formData.contactPerson}
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
                <label htmlFor="businessType">Business Type</label>
                <select 
                  id="businessType" 
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Business Type</option>
                  <option value="technology">Technology</option>
                  <option value="consulting">Consulting</option>
                  <option value="marketing">Marketing</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="partnershipInterest">Partnership Interest</label>
                <select 
                  id="partnershipInterest" 
                  name="partnershipInterest"
                  value={formData.partnershipInterest}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Partnership Type</option>
                  <option value="reseller">Reseller</option>
                  <option value="referral">Referral</option>
                  <option value="strategic">Strategic</option>
                  <option value="technology">Technology</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label htmlFor="companyWebsite">Company Website</label>
                <input 
                  type="url" 
                  id="companyWebsite" 
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleChange}
                  placeholder="https://www.yourcompany.com"
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
                  placeholder="Tell us more about your partnership interests..."
                ></textarea>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">Submit Partnership Application</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PartnerPage;