import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppChat.css";
import { Link } from "react-router-dom";
import Header from "./components/Header";
import emailjs from "@emailjs/browser";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

// Main application component
function App() {
  // All hooks must be at the top level
  const [animateHero, setAnimateHero] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    service: "",
    message: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState({
    isSubmitting: false,
    error: null,
  });
  const [messageDisplay, setMessageDisplay] = useState({
    show: false,
    message: "",
    type: "success", // 'success' or 'error'
  });
  const [isWhatsAppChatOpen, setIsWhatsAppChatOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Simulate loading time (you can remove this setTimeout if you have actual data loading)
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  // Use effect hook to trigger hero animation when component mounts
  useEffect(() => {
    setAnimateHero(true);
  }, []);

  // Automatically cycle through background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % techImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Array of background images for the hero section
  // Uses high-quality tech-related images from Unsplash
  const techImages = [
    "https://images.unsplash.com/photo-1551650975-87deedd944c3", // Tech workspace image
    "https://images.unsplash.com/photo-1488590528505-98d2b5ade38b", // Coding screen image
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // Programming environment image
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // Laptop and tech setup image
  ];

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

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

      <Header />
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
      <Footer />
    </div>
  );
}

export default App;
