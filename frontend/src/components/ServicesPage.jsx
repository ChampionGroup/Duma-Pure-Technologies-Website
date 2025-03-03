import React, { useState, useEffect } from "react";
import {
  FaPaintBrush,
  FaChartLine,
  FaUniversalAccess,
  FaServer,
} from "react-icons/fa";
import Header from "./Header"; 
import Footer from "./Footer"; 
import LoadingSpinner from './LoadingSpinner';

function ServicesPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (you can remove this setTimeout if you have actual data loading)
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const services = [
    {
      title: "Web Development",
      description: "Custom web solutions that drive your business forward",
      icon: "💻",
    },
    {
      title: "Cloud Solutions",
      description: "Scalable and secure cloud infrastructure",
      icon: "☁️",
    },
    {
      title: "AI & Machine Learning",
      description: "Intelligent solutions powered by cutting-edge AI",
      icon: "🤖",
    },
    {
      title: "Cybersecurity",
      description:
        "Comprehensive security strategies to protect your digital assets",
      icon: "🔒",
    },
    {
      title: "Experience Design",
      description:
        "Our award-winning UX designers go beyond a typical web design agency to create both visually impressive and functional online experiences.",
      icon: <FaPaintBrush />,
    },
    {
      title: "Digital Marketing",
      description:
        "Through SEO, PPC, content, Branding, and social media marketing, we develop strategies that grow your business and enhance your digital presence.",
      icon: <FaChartLine />,
    },
    {
      title: "Accessibility",
      description:
        "We provide accessibility assessment, remediation, and training to maximize inclusion within modern digital solutions, ensuring your website accessibility requirements are met.",
      icon: <FaUniversalAccess />,
    },
    {
      title: "Hosting & Security",
      description:
        "As a secure hosting provider with in-house data centers, we provide secure, Compliant hosting that's supported by experienced staff members 24/7/365.",
      icon: <FaServer />,
    },
  ];

  return (
    <div>
      <Header />
      <section id="services" className="services">
        <h2 className="section-title">Our Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card hover-float">
              <div className="service-icon">
                {typeof service.icon === "string" ? service.icon : service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default ServicesPage;
