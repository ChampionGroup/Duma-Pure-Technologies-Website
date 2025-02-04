import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Header from "./Header"; 
import Footer from "./Footer"; 
import Hosting from "../assets/hosting.jpg";
import Cybersecurity from "../assets/cybersecurity.jpg";
import Consulting from "../assets/consulting.jpg";

function SolutionsPage() {
  const [activeService, setActiveService] = useState(null);
  const navigate = useNavigate();

  const solutions = [
    {
      title: "Enterprise Web Development",
      description:
        "Custom web solutions that drive your business forward with scalable, responsive, and innovative design",
      image: "https://images.unsplash.com/photo-1522252234503-e356532cafd5", // Coding workspace
      service: "Web Development",
      details: [
        "Responsive Design",
        "Custom CMS Integration",
        "Performance Optimization",
        "Cross-Platform Compatibility",
      ],
    },
    {
      title: "Cloud Infrastructure Optimization",
      description:
        "Scalable and secure cloud solutions tailored to your business needs, ensuring maximum performance and reliability",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6", // Cloud computing
      service: "Cloud Solutions",
      details: [
        "Multi-Cloud Strategy",
        "Serverless Architecture",
        "Cost Optimization",
        "High Availability Design",
      ],
    },
    {
      title: "AI-Powered Business Intelligence",
      description:
        "Intelligent solutions powered by cutting-edge AI to transform data into actionable insights",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71", // AI and machine learning
      service: "AI & Machine Learning",
      details: [
        "Predictive Analytics",
        "Machine Learning Models",
        "Natural Language Processing",
        "Data Visualization",
      ],
    },
    {
      title: "Comprehensive Cybersecurity Framework",
      description:
        "Advanced security strategies to protect your digital assets from emerging threats and vulnerabilities",
      image: Cybersecurity, 
      service: "Cybersecurity",
      details: [
        "Threat Detection",
        "Penetration Testing",
        "Security Audits",
        "Compliance Management",
      ],
    },
    {
      title: "UX/UI Design Transformation",
      description:
        "Award-winning design solutions that create visually impressive and highly functional user experiences",
      image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e", // UX design
      service: "Experience Design",
      details: [
        "User Research",
        "Interaction Design",
        "Prototype Development",
        "Accessibility Optimization",
      ],
    },
    {
      title: "Integrated Digital Marketing Strategy",
      description:
        "Comprehensive marketing solutions leveraging SEO, PPC, content, and social media to enhance digital presence",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0", // Digital marketing
      service: "Digital Marketing",
      details: [
        "SEO Optimization",
        "Content Strategy",
        "Social Media Marketing",
        "Analytics & Reporting",
      ],
    },
    {
      title: "Digital Accessibility Consulting",
      description:
        "Comprehensive accessibility assessment and remediation to ensure inclusive digital solutions",
      image: Consulting,
      service: "Accessibility",
      details: [
        "WCAG Compliance",
        "Assistive Technology",
        "Inclusive Design",
        "Accessibility Audits",
      ],
    },
    {
      title: "Secure Hosting Solutions",
      description:
        "Robust, compliant hosting with 24/7 support and state-of-the-art security infrastructure",
      image: Hosting,
      service: "Hosting & Security",
      details: [
        "24/7 Monitoring",
        "DDoS Protection",
        "Automated Backups",
        "Scalable Infrastructure",
      ],
    },
  ];

  const handleServiceClick = (service) => {
    setActiveService(activeService === service ? null : service);
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Header />
      <section id="solutions" className="solutions page-container">
        <h2 className="section-title">Our Solutions</h2>

        <div className="solutions-carousel">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className={`solution-card ${
                activeService === solution ? "active" : ""
              }`}
              onClick={() => handleServiceClick(solution)}
            >
              <img
                src={solution.image}
                alt={solution.title}
                className="solution-image"
              />
              <div className="solution-content">
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <span className="solution-service-tag">{solution.service}</span>

                {activeService === solution && (
                  <div className="service-details">
                    <h4>Key Features:</h4>
                    <ul>
                      {solution.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default SolutionsPage;
