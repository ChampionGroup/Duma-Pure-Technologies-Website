import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css";
import Software from "../assets/software.jpg";
import LoadingSpinner from "./LoadingSpinner";
import Black from "../assets/Black1.jpg";
import Black2 from "../assets/Black2.jpg";

function CareerPage() {
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

  const jobOpenings = [
    {
      title: "Software Engineer",
      description: "Design and develop cutting-edge technological solutions",
      image: Software,
      responsibilities: [
        "Develop scalable web and mobile applications",
        "Collaborate with cross-functional teams",
        "Implement best practices in software development",
      ],
    },
    {
      title: "UX/UI Designer",
      description: "Create intuitive and innovative user experiences",
      image:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      responsibilities: [
        "Design user-centered interfaces",
        "Conduct user research and usability testing",
        "Create wireframes and interactive prototypes",
      ],
    },
    {
      title: "Data Analyst",
      description: "Transform data into actionable insights",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      responsibilities: [
        "Analyze complex datasets",
        "Create data visualization dashboards",
        "Provide strategic recommendations based on data",
      ],
    },
    {
      title: "Project Manager",
      description:
        "Lead and coordinate complex digital transformation projects",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      responsibilities: [
        "Manage project lifecycles",
        "Coordinate cross-functional teams",
        "Ensure project delivery   and client satisfaction",
      ],
    },
  ];

  const heroImages = [
    Black,
    Black2
  ];

  return (
    <div>
      <Header />
    <div className="career-page">
      <section className="career-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="section-title">
              Build Your Future at Duma Pure Technologies
            </h1>
            <p className="career-description">
              Join a team of innovative professionals dedicated to transforming
              technology and driving digital excellence.
            </p>
            <div className="hero-images">
              {heroImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Team Collaboration ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="career-opportunities">
        <div className="container">
          <h2>Current Openings</h2>
          <div className="job-listings">
            {jobOpenings.map((job, index) => (
              <div key={index} className="job-card">
                <img src={job.image} alt={job.title} className="job-image" />
                <div className="job-details">
                  <h3>{job.title}</h3>
                  <p className="job-description">{job.description}</p>
                  <h4>Key Responsibilities:</h4>
                  <ul>
                    {job.responsibilities.map((resp, respIndex) => (
                      <li key={respIndex}>{resp}</li>
                    ))}
                  </ul>
                  <Link to="/applynow" className="apply-btn">
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="career-benefits">
        <div className="container">
          <h2>Why Work With Us</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <i className="icon-growth"></i>
              <h3>Professional Growth</h3>
              <p>Continuous learning and development opportunities</p>
            </div>
            <div className="benefit-card">
              <i className="icon-innovation"></i>
              <h3>Innovative Environment</h3>
              <p>Work on groundbreaking projects that make a difference</p>
            </div>
            <div className="benefit-card">
              <i className="icon-compensation"></i>
              <h3>Competitive Compensation</h3>
              <p>Attractive salary packages and performance bonuses</p>
            </div>
            <div className="benefit-card">
              <i className="icon-balance"></i>
              <h3>Work-Life Balance</h3>
              <p>Flexible working hours and remote work options</p>
            </div>
          </div>
        </div>
      </section>

      <section className="career-application">
        <div className="container">
          <h2>Ready to Grow Your Career?</h2>
          <p>
            If you don't see a perfect match but believe you'd be a great fit,
            we'd love to hear from you.
          </p>
          <button className="contact-btn">Send Your Resume</button>
        </div>
      </section>
    </div>
      <Footer />
    </div>
  );
}

export default CareerPage;
