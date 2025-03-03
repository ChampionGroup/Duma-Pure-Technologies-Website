import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import { FaHome, FaStore, FaTicketAlt, FaBars, FaTimes, FaUser, FaBell } from 'react-icons/fa';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2>Duma Pure</h2>
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            {isSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeSection === 'home' ? 'active' : ''}`}
            onClick={() => setActiveSection('home')}
          >
            <FaHome /> <span>Home</span>
          </button>
          <button 
            className={`nav-item ${activeSection === 'store' ? 'active' : ''}`}
            onClick={() => setActiveSection('store')}
          >
            <FaStore /> <span>Store</span>
          </button>
          <button 
            className={`nav-item ${activeSection === 'ticket' ? 'active' : ''}`}
            onClick={() => setActiveSection('ticket')}
          >
            <FaTicketAlt /> <span>Submit Ticket</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Navigation */}
        <header className="dashboard-header">
          <div className="header-left">
            <button className="mobile-sidebar-toggle" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <h1>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}</h1>
          </div>
          <div className="header-right">
            <button className="header-icon"><FaBell /></button>
            <button className="header-icon"><FaUser /></button>
          </div>
        </header>

        {/* Content Area */}
        <div className="dashboard-content">
          {activeSection === 'home' && (
            <div className="dashboard-home">
              <div className="stats-container">
                <div className="stat-card">
                  <div className="stat-info">
                    <h3>Active Projects</h3>
                    <p className="stat-number">3</p>
                  </div>
                  <div className="stat-icon active-projects"></div>
                </div>
                <div className="stat-card">
                  <div className="stat-info">
                    <h3>Open Tickets</h3>
                    <p className="stat-number">2</p>
                  </div>
                  <div className="stat-icon open-tickets"></div>
                </div>
                <div className="stat-card">
                  <div className="stat-info">
                    <h3>Services Used</h3>
                    <p className="stat-number">4</p>
                  </div>
                  <div className="stat-icon services-used"></div>
                </div>
              </div>

              <div className="recent-activity">
                <h2>Recent Activity</h2>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon"></div>
                    <div className="activity-details">
                      <h4>New Ticket Created</h4>
                      <p>Technical support request submitted</p>
                      <span className="activity-time">2 hours ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon"></div>
                    <div className="activity-details">
                      <h4>Service Purchased</h4>
                      <p>Website Development Package</p>
                      <span className="activity-time">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'store' && (
            <div className="store-section">
              <div className="services-grid">
                {[
                  {
                    title: 'Website Development',
                    description: 'Custom web solutions tailored to your business needs',
                    price: 'From $999',
                    features: ['Custom Design', 'Responsive Layout', 'SEO Optimization']
                  },
                  {
                    title: 'Cloud Services',
                    description: 'Secure and scalable cloud infrastructure solutions',
                    price: 'From $199/month',
                    features: ['24/7 Support', 'Data Backup', 'Security Monitoring']
                  },
                  {
                    title: 'IT Consulting',
                    description: 'Expert technology consulting and strategy',
                    price: 'From $150/hour',
                    features: ['Business Analysis', 'Tech Strategy', 'Implementation Plan']
                  }
                ].map((service, index) => (
                  <div key={index} className="service-card">
                    <div className="service-header">
                      <h3>{service.title}</h3>
                      <p className="price">{service.price}</p>
                    </div>
                    <p className="service-description">{service.description}</p>
                    <ul className="service-features">
                      {service.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                    <button className="service-button">Purchase Now</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'ticket' && (
            <div className="ticket-section">
              <div className="ticket-form-container">
                <form className="ticket-form">
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      placeholder="Brief description of the issue"
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select id="category" required>
                      <option value="">Select a category</option>
                      <option value="technical">Technical Support</option>
                      <option value="billing">Billing</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="priority">Priority</label>
                    <select id="priority" required>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea 
                      id="description" 
                      rows="5" 
                      placeholder="Detailed description of your issue"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-ticket-btn">Submit Ticket</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;