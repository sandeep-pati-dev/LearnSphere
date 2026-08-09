import React, { useState } from "react";
import "./footer.css";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Input from "../ui/Input";
import toast from "react-hot-toast";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="main-footer">
      <div className="footer-columns">
        {/* Brand Column */}
        <div className="footer-column brand-col">
          <div className="footer-logo">
            Learn<span>Sphere</span>
          </div>
          <p className="footer-tagline">
            Empowering students worldwide with expert-led practical video courses and real-world developer portfolios.
          </p>
          <div className="social-links">
            <a href="https://www.facebook.com/sandeepkumar.pati.92" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://x.com/sandeep_pati18" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/sandeep_27.2/" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/sandeep-pati-537ba030b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app " target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Links Column */}
        <div className="footer-column">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/about">Terms of Service</Link></li>
            <li><Link to="/about">Privacy Policy</Link></li>
            <li><Link to="/about">Refund Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter Column */}
        <div className="footer-column newsletter-col">
          <h4>Newsletter</h4>
          <p>Subscribe to receive weekly updates, course releases, and developer resources.</p>
          <form onSubmit={handleSubscribe} className="newsletter-form">
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                padding: "8px 12px",
                borderRadius: "8px",
                fontSize: "14px",
                color: "#fff",
                width: "100%"
              }}
            />
            <Button type="submit" style={{ padding: "8px 16px", fontSize: "14px", width: "100%" }}>
              Subscribe
            </Button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} LearnSphere. All rights reserved. Built for production-readiness.</p>
      </div>
    </footer>
  );
};

export default Footer;
