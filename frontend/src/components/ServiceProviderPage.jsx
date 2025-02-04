import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

function ServiceProviderPage() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    serviceType: '',
    yearsInBusiness: '',
    certifications: '',
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
    console.log('Service Provider Application Submitted:', formData);
    alert('Thank you for your service provider application! We will review it shortly.');
  };

  return (
    <div className="service-provider-page">
      <Header />
      <div className="form-page">
        <div className="form-container">
          <h2 className="text-center mb-4">Become a Service Provider</h2>
          <form onSubmit={handleSubmit} className="service-provider-form">
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
                <label htmlFor="serviceType">Service Type</label>
                <select 
                  id="serviceType" 
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Service Type</option>
                  <option value="it">IT Services</option>
                  <option value="consulting">Consulting</option>
                  <option value="marketing">Marketing</option>
                  <option value="design">Design</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="yearsInBusiness">Years in Business</label>
                <input 
                  type="number" 
                  id="yearsInBusiness" 
                  name="yearsInBusiness"
                  value={formData.yearsInBusiness}
                  onChange={handleChange}
                  min="0"
                  max="50"
                  required 
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="certifications">Professional Certifications</label>
                <input 
                  type="text" 
                  id="certifications" 
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  placeholder="List your professional certifications"
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
                  placeholder="Tell us more about your services and capabilities..."
                ></textarea>
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="submit-btn">Submit Service Provider Application</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ServiceProviderPage;