import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { 
  FaGlobeAmericas, 
  FaUsers, 
  FaTrophy,
  FaHandshake,
  FaChartLine 
} from 'react-icons/fa';
import '../App.css';

function AboutPage() {
  const teamMembers = [
    {
      name: "John Doe",
      title: "CEO & Founder",
      image: "https://www.freeiconspng.com/thumbs/question-mark-png/question-mark-png-25.png",
      bio: "A visionary leader with extensive experience in technology transformation."
    },
    {
      name: "John Doe",
      title: "Chief Technology Officer",
      image: "https://www.freeiconspng.com/thumbs/question-mark-png/question-mark-png-25.png",
      bio: "An expert in innovative technology solutions and strategic planning."
    },
    {
      name: "John Doe",
      title: "Head of Design",
      image: "https://www.freeiconspng.com/thumbs/question-mark-png/question-mark-png-25.png",
      bio: "A creative professional driving user-centric design experiences."
    },
    {
      name: "John Doe",
      title: "VP of Operations",
      image: "https://www.freeiconspng.com/thumbs/question-mark-png/question-mark-png-25.png",
      bio: "A strategic leader ensuring seamless execution of complex projects."
    }
  ];

  const companyMilestones = [
    {
      year: 2015,
      title: "Company Founded",
      description: "Established with a vision to transform digital landscapes."
    },
    {
      year: 2018,
      title: "First Major Client",
      description: "Secured a landmark project with a Fortune 500 company."
    },
    {
      year: 2020,
      title: "Innovation Award",
      description: "Recognized for groundbreaking AI and machine learning solutions."
    },
    {
      year: 2022,
      title: "Global Expansion",
      description: "Opened international offices in London and Singapore."
    }
  ];

  return (
    <div className="about-page">
      <Header />
      
     {/* Hero Section */}
     <section className="about-hero" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="container">
          <div className="hero-content">
            <h1>Innovating Tomorrow, Today</h1>
            <p>Duma Pure Technologies: Pioneering Digital Transformation</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-values">
        <div className="container">
          <h2 className="text-center mb-5">Our Core Values</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="value-card">
                <FaChartLine className="value-icon" />
                <h3>Mission</h3>
                <p>At our DUMA PURE TECHNOLOGIES, we are passionate about helping our clients make a global impact. We understand that in today's interconnected world, reaching a broader audience is crucial for success. Through our innovative design solutions, we empower our clients to showcase their brands and offerings on a global scale.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-card">
                <FaHandshake className="value-icon" />
                <h3>Vision</h3>
                <p>Our vision is to give organizations a partner they can count on to help them achieve their mission through the way they share their story.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="value-card">
                <FaHandshake className="value-icon" />
                <h3>Integrity</h3>
                <p>Committed to transparency, trust, and ethical business practices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Projects */}
      <section className="about-projects">
        <div className="container">
          <h2 className="text-center mb-5">Our Projects</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="project-card">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="Enterprise Web Solution" 
                />
                <h3>Enterprise Web Solution</h3>
                <p>Scalable digital platform for multinational corporation.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="project-card">
                <img 
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="AI Integration" 
                />
                <h3>AI Integration</h3>
                <p>Machine learning solution for predictive analytics.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="project-card">
                <img 
                  src="https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" 
                  alt="Cloud Migration" 
                />
                <h3>Cloud Migration</h3>
                <p>Seamless cloud infrastructure transformation.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="about-process">
        <div className="container">
          <h2 className="text-center mb-5">Our Process</h2>
          <div className="process-steps">
            {[
              {
                title: "Discovery",
                description: "Understanding client needs and business objectives."
              },
              {
                title: "Strategy",
                description: "Developing a comprehensive digital transformation roadmap."
              },
              {
                title: "Implementation",
                description: "Executing solutions with precision and innovation."
              },
              {
                title: "Support",
                description: "Continuous optimization and technical support."
              }
            ].map((step, index) => (
              <div 
                key={index} 
                className={`process-step ${index % 2 === 0 ? 'process-left' : 'process-right'}`}
              >
                <div className="process-content">
                  <h3>{`${index + 1}. ${step.title}`}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="about-leadership">
        <div className="container">
          <h2 className="text-center mb-5">Our Leadership Team</h2>
          <div className="row">
            {teamMembers.map((member, index) => (
              <div key={index} className="col-md-3">
                <div className="leadership-card">
                  <img src={member.image} alt={member.name} />
                  <h3>{member.name}</h3>
                  <p className="title">{member.title}</p>
                  <p className="bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="about-achievements">
        <div className="container">
          <h2 className="text-center mb-5">Our Achievements</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="achievement-card">
                <FaGlobeAmericas className="achievement-icon" />
                <h3>Global Reach</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi modi minus iste neque ratione praesentium laudantium, minima quibusdam, incidunt voluptatum, accusantium facere harum culpa reiciendis mollitia totam quam suscipit sequi?</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="achievement-card">
                <FaUsers className="achievement-icon" />
                <h3>Team Strength</h3>
                <p>50+ passionate technology professionals</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="achievement-card">
                <FaTrophy className="achievement-icon" />
                <h3>Industry Awards</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptate assumenda maiores laboriosam autem. Aspernatur, id. Fugiat esse error porro explicabo assumenda. Magni odit explicabo minus deserunt. Voluptatibus, ab error.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AboutPage;