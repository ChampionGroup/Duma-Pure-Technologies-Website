import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import "../App.css";
import { Link } from "react-router-dom";


function Footer() {
  return (
    <footer
      className="bg-dark text-white py-5"
      style={{ backgroundColor: "#3498db" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5>Let's Talk About</h5>
            <p>
              We specialize in developing innovative technological solutions for
              businesses of all sizes, and our team of experienced professionals
              is committed to providing you with the best possible service and
              products.
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
              <Link to="/become-partner" className="btn btn-outline-light mx-2">
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
  );
}

export default Footer;
