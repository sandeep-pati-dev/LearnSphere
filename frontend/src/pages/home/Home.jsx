import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { FaLaptopCode, FaDatabase, FaPalette, FaBriefcase, FaGraduationCap, FaClock, FaAward } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <div className="home-hero">
        <div className="home-hero-content">
          <h1 className="hero-title">Empower Your Future with <span className="highlight">LearnSphere</span></h1>
          <p className="hero-subtitle">
            Access premium courses designed by industry experts. Acquire real-world skills, work on hands-on projects, and accelerate your career.
          </p>
          <div className="hero-actions">
            <Button onClick={() => navigate("/courses")} style={{ fontSize: "17px", padding: "12px 28px" }}>
              Explore Courses
            </Button>
            <Button onClick={() => navigate("/about")} variant="secondary" style={{ fontSize: "17px", padding: "12px 28px" }}>
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Trust Statistics Strip */}
      <div className="stats-strip">
        <div className="stat-item">
          <h2>10K+</h2>
          <p>Active Students</p>
        </div>
        <div className="stat-item">
          <h2>150+</h2>
          <p>Expert Mentors</p>
        </div>
        <div className="stat-item">
          <h2>50+</h2>
          <p>Premium Courses</p>
        </div>
        <div className="stat-item">
          <h2>98%</h2>
          <p>Satisfaction Rate</p>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="value-proposition">
        <h2 className="section-title">Why Learn On LearnSphere?</h2>
        <div className="value-grid">
          <Card className="value-card">
            <div className="value-icon"><FaGraduationCap /></div>
            <h3>Learn from Experts</h3>
            <p>Our courses are created and mentored by seasoned software engineers and designers.</p>
          </Card>
          <Card className="value-card">
            <div className="value-icon"><FaClock /></div>
            <h3>Flexible Learning</h3>
            <p>Study on your own schedule. Lifetime access allows you to review content anytime.</p>
          </Card>
          <Card className="value-card">
            <div className="value-icon"><FaAward /></div>
            <h3>Practical Projects</h3>
            <p>Build real-world portfolios, write clean code, and execute hands-on homework assignments.</p>
          </Card>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="categories-section">
        <h2 className="section-title">Browse Top Categories</h2>
        <div className="categories-grid">
          <div className="category-item" onClick={() => navigate("/courses")}>
            <div className="category-icon"><FaLaptopCode /></div>
            <h4>Web Development</h4>
            <p>React, Node, Express & databases</p>
          </div>
          <div className="category-item" onClick={() => navigate("/courses")}>
            <div className="category-icon"><FaDatabase /></div>
            <h4>Data Science</h4>
            <p>Python, ML, and data analysis</p>
          </div>
          <div className="category-item" onClick={() => navigate("/courses")}>
            <div className="category-icon"><FaPalette /></div>
            <h4>UI/UX Design</h4>
            <p>Figma prototyping and user testing</p>
          </div>
          <div className="category-item" onClick={() => navigate("/courses")}>
            <div className="category-icon"><FaBriefcase /></div>
            <h4>Business & Marketing</h4>
            <p>SEO, scaling startup strategies</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
};

export default Home;
