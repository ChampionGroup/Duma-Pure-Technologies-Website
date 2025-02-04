import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppChat.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Logo from "./assets/Duma.png";
import emailjs from "@emailjs/browser";

// Main application component
function App() {
  // State to control hero section animation
  const [animateHero, setAnimateHero] = useState(false);

  // New state for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Use effect hook to trigger hero animation when component mounts
  useEffect(() => {
    setAnimateHero(true);
  }, []);

  // Array of background images for the hero section
  // Uses high-quality tech-related images from Unsplash
  const techImages = [
    "https://images.unsplash.com/photo-1551650975-87deedd944c3", // Tech workspace image
    "https://images.unsplash.com/photo-1488590528505-98d2b5ade38b", // Coding screen image
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // Programming environment image
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // Laptop and tech setup image
  ];

  // State for current background image
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  // Automatically cycle through background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % techImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // State for contact form
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });

  // State for submission status
  const [submissionStatus, setSubmissionStatus] = useState({
    isSubmitting: false,
    error: null,
  });

  // State for message display
  const [messageDisplay, setMessageDisplay] = useState({
    show: false,
    message: "",
    type: "success", // 'success' or 'error'
  });

  // Handle input change for contact form
  const handleInputChange = (event) => {
    setContactForm({
      ...contactForm,
      [event.target.name]: event.target.value,
    });
  };

  // EmailJS Contact Form Submission
  const sendEmail = (e) => {
    e.preventDefault();

    // Configure your EmailJS service and template IDs here
    const serviceId = "service_7kefg4k";
    const templateId = "template_1po4nmi";
    const publicKey = "pZGzSFXNr5aDYrrI5";

    // Function to show attractive message
    const showMessage = (message, type = "success", duration = 3000) => {
      setMessageDisplay({ show: true, message, type });

      // Automatically hide message after specified duration
      setTimeout(() => {
        setMessageDisplay({ show: false, message: "", type: "success" });
      }, duration);
    };
    // Initialize EmailJS with your public key
    emailjs.init(publicKey);

    // Create an object with form data
    const templateParams = {
      name: e.target.name.value,
      email: e.target.email.value,
      service: e.target.service.value,
      message: e.target.message.value,
    };

    // Send email using EmailJS
    emailjs
      .send(serviceId, templateId, templateParams)
      .then((response) => {
        showMessage("Email sent successfully!", "success");
        // Optional: Reset form fields
        e.target.reset();
      })
      .catch((error) => {
        // console.error('Email sending failed:', error);
        showMessage("Email sending failed", "error");
      });
  };

  // WhatsApp Chat State
  const [isWhatsAppChatOpen, setIsWhatsAppChatOpen] = useState(false);

  // Toggle WhatsApp Chat Modal
  const toggleWhatsAppChat = () => {
    setIsWhatsAppChatOpen(!isWhatsAppChatOpen);
  };

  // Send WhatsApp Message
  const sendWhatsAppMessage = (message) => {
    const phoneNumber = "+27656496828";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="digital-tech-website">
      {/* Attractive Message Display */}
      {messageDisplay.show && (
        <div className={`message-display ${messageDisplay.type}`}>
          <div className="message-content">
            <div className="message-icon">
              {messageDisplay.type === "success" ? "✓" : "✗"}
            </div>
            <span className="message-text">{messageDisplay.message}</span>
          </div>
        </div>
      )}
      {/* Mobile Menu Toggle */}
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <FaBars />
      </button>
      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          <button className="close-menu" onClick={toggleMobileMenu}>
            <FaTimes />
          </button>
          <nav>
            <a href="#services" onClick={toggleMobileMenu}>
              Services
            </a>
            <a href="#solutions" onClick={toggleMobileMenu}>
              Solutions
            </a>
            <a href="#about" onClick={toggleMobileMenu}>
              About
            </a>
            <a href="#contact" onClick={toggleMobileMenu}>
              Contact
            </a>
          </nav>
        </div>
      </div>
      {/* Header section with logo and navigation */}
      <header className="header">
        <div className="logo-container">
          <img
            src={Logo}
            alt="Duma Pure Technologies Logo"
            className="logo-image"
          />
          <span className="logo-text">Duma Pure Technologies</span>
        </div>
        <nav className="navigation">
          {/* Navigation links with smooth scrolling to different sections */}
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/services" className="nav-link">
            Services
          </Link>
          <Link to="/solutions" className="nav-link">
            Solutions
          </Link>
          <a href="#contact" className="nav-link">
            Contact
          </a>
          <Link to="/career" className="nav-link">
            Career
          </Link>
          <button className="login-button">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </button>
          <button className="login-button">
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </button>
        </nav>
      </header>
      <main>
        <section id="hero" className={`hero ${animateHero ? "animate" : ""}`}>
          <div className="hero-background">
            {techImages.map((img, index) => (
              <div
                key={index}
                className={`hero-bg-image ${
                  index === currentBgIndex ? "active" : ""
                }`}
                style={{ backgroundImage: `url(${img})` }}
              ></div>
            ))}
          </div>

          <div className="hero-content">
            <h1 className="hero-title">Digital Transformation Starts Here</h1>
            <p className="hero-subtitle">
              Innovative Technology Solutions for Modern Businesses
            </p>
            <button
              className="cta-button pulse-animation"
              onClick={() => {
                document.getElementById("contact").scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Get Started
            </button>
          </div>
        </section>

        <section id="about" className="about">
          <h2 className="section-title">About Us</h2>
          <p>
            We are a team of passionate technologists dedicated to pushing the
            boundaries of digital innovation. With years of experience and a
            forward-thinking approach, we help businesses thrive in the digital
            age.
          </p>

          <button className="cta-button pulse-animation" id="learn-more-button">
            <Link to="/about" className="nav-link">
              Learn More
            </Link>
          </button>
        </section>

        <section id="contact" className="contact">
          <h2 className="section-title">Contact Us</h2>
          <form className="contact-form" onSubmit={sendEmail}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={contactForm.name}
              onChange={handleInputChange}
              required
              className="form-input"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={contactForm.email}
              onChange={handleInputChange}
              required
              className="form-input"
            />
            <select
              name="service"
              className="form-input"
              value={contactForm.service}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Service of Interest</option>
              <option value="web-development">Web Development</option>
              <option value="cloud-solutions">Cloud Solutions</option>
              <option value="ai-ml">AI & Machine Learning</option>
              <option value="cybersecurity">Cybersecurity</option>
              <option value="general-inquiry">General Inquiry</option>
            </select>
            <textarea
              name="message"
              placeholder="Your Message"
              value={contactForm.message}
              onChange={handleInputChange}
              required
              className="form-input"
            ></textarea>
            <button
              type="submit"
              className="submit-button"
              disabled={submissionStatus.isSubmitting}
            >
              {submissionStatus.isSubmitting ? "Sending..." : "Send Message"}
            </button>
            {submissionStatus.error && (
              <p className="error-message">{submissionStatus.error}</p>
            )}
          </form>
          <div className="contact-info">
            <div className="contact-section">
              <h3>Phone Support</h3>
              <p>Want to talk to someone over the phone?</p>
              <p>No Problem! Give us a call.</p>
              <p>
                Quick Support: <a href="tel:+27656496828">+27 (65) 649 6828</a>
              </p>
            </div>

            <div className="contact-section">
              <h3>WhatsApp Support</h3>
              <p>
                Our friendly WhatsApp Support Team Are Ready To Assist{" "}
                <a href="tel:+27656496828">+27 (65) 649 6828</a>
              </p>
            </div>

            <div className="contact-section">
              <h3>Email Support</h3>
              <p>
                Website Support:{" "}
                <a href="mailto:support@dumapuretechnologies.co.za">
                  support@dumapuretechnologies.co.za
                </a>
              </p>
              <p>
                We provide clients with ticket-based support, simply log a
                ticket and we'll resolve your issue as soon as possible.
              </p>
              <p>
                Hosting Support:{" "}
                <a href="mailto:info@dumapuretechnologies.co.za">
                  info@dumapuretechnologies.co.za
                </a>
              </p>
              <p>
                Our friendly support team are always ready to assist with the
                needs of your hosting.
              </p>
              <p>
                Sales:{" "}
                <a href="mailto:sales@dumapuretechnologies.co.za">
                  sales@dumapuretechnologies.co.za
                </a>
              </p>
              <p>
                Our friendly team are always ready to assist and shape your
                project to meet your budget.
              </p>
            </div>

            <div className="contact-section">
              <h3>Working Hours</h3>
              <p>We work remotely across South Africa</p>
              <p>Mon - Thur: 8:00 - 17:00</p>
              <p>Fridays: 8:00 - 15:00</p>
            </div>
          </div>
        </section>
      </main>
      {isWhatsAppChatOpen && (
        <div className="whatsapp-chat-modal">
          <div className="whatsapp-chat-container">
            <div className="whatsapp-chat-header">
              <h3>Chat with Us on WhatsApp</h3>
              <button onClick={toggleWhatsAppChat} className="close-chat-btn">
                ×
              </button>
            </div>
            <div className="whatsapp-chat-body">
              <p>Hey there! 👋 How can we help you today?</p>
            </div>
            <div className="whatsapp-chat-footer">
              <textarea
                placeholder="Type your message..."
                className="whatsapp-message-input"
              ></textarea>
              <button
                className="send-whatsapp-message"
                onClick={() => {
                  const messageInput = document.querySelector(
                    ".whatsapp-message-input"
                  );
                  sendWhatsAppMessage(messageInput.value);
                  messageInput.value = "";
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="whatsapp-chat-widget">
        <button onClick={toggleWhatsAppChat} className="whatsapp-chat-button">
          <FaWhatsapp size={40} />
        </button>
      </div>
      <footer
        className="bg-dark text-white py-5"
        style={{ backgroundColor: "#3498db" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5>Let's Talk About</h5>
              <p>
                We specialize in developing innovative technological solutions
                for businesses of all sizes, and our team of experienced
                professionals is committed to providing you with the best
                possible service and products.
              </p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>About Us</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/about" className="text-white no-underline">
                    <span className="me-2">{">"}</span>About
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Projects
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Process
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Clients
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Industries
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Testimonials
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Our Leadership Team
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Blog
                  </Link>
                </li>
                <li>
                  <Link to="/career" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Services</h5>
              <ul className="list-unstyled">
                <li>
                  <Link to="/services" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Website Design
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Web Support & Maintenance
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Web Hosting Services
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Graphic Design & Branding
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Digital Marketing
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Social Media Management
                  </Link>
                </li>
                <li>
                  <Link className="text-white no-underline">
                    <span className="me-2">{">"}</span>Microsoft Office 365
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Laptop Repair Services
                  </Link>
                </li>
                <li>
                  <Link to="/services" className="text-white no-underline">
                    <span className="me-2">{">"}</span>Business Consulting
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 text-center">
              <h5>Earn With Us</h5>
              <div>
                <Link
                  to="/become-partner"
                  className="btn btn-outline-light mx-2"
                >
                  Become A Partner
                </Link>
                <Link to="/become-agent" className="btn btn-outline-light mx-2">
                  Become An Agent
                </Link>
                <Link
                  to="/become-service-provider"
                  className="btn btn-outline-light mx-2"
                >
                  Become A Service Provider
                </Link>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-12 text-center">
              <div className="social-links">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white mx-2"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white mx-2"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white mx-2"
                >
                  <FaTwitter size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white mx-2"
                >
                  <FaLinkedin size={24} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white mx-2"
                >
                  <FaYoutube size={24} />
                </a>
              </div>
              <p className="mt-3">
                &copy; {new Date().getFullYear()} Digital Agency. All Rights
                Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
