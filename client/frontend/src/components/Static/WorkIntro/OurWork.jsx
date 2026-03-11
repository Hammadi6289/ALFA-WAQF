import React from "react";
import "./OurWork.css";
import hospitalWaiting from "../../../assets/images/aboutusImg.jpg";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiPhone, FiClock, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const OurWork = () => {
  const navigate = useNavigate();
  return (
    <section className="intro-section">
      <div className="container">
        <div className="intro-grid">
          {/* Left Column - Image */}
          <div className="intro-image-wrapper animate-on-scroll">
            <div className="image-decoration">
              <div className="decoration-1"></div>
              <div className="decoration-2"></div>
            </div>
            <img
              className="intro-image"
              src={hospitalWaiting}
              alt="Alfalah General Hospital - Modern healthcare facility"
              loading="lazy"
            />
            <div className="experience-badge">
              <span className="years">25+</span>
              <span className="text">Years of Excellence</span>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="intro-content animate-on-scroll">
            {/* Section Header */}
            <div className="section-header">
              <span className="section-tagline">Welcome to</span>
              <h2 className="section-title">Alfalah General Hospital</h2>
              <div className="title-underline"></div>
            </div>

            {/* Description */}
            <p className="hospital-description">
              A Project of Alfalah Hospital Sangjani Islamabad, in collaboration
              with Excel Lab. We provide comprehensive healthcare services
              including Gynecology, Medicine, Surgery, ENT, Dental, ECG, and
              Digital X-ray services.
            </p>

            {/* Features Grid */}
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon emergency">
                  <FiClock />
                </div>
                <div className="feature-text">
                  <h4>24/7 Emergency</h4>
                  <p>Round the clock care</p>
                </div>
              </div>
              <div className="feature-item">
                <div className="feature-icon lab">
                  <FiMapPin />
                </div>
                <div className="feature-text">
                  <h4>Excel Lab</h4>
                  <p>Advanced diagnostics</p>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="location-info">
              <FiMapPin className="location-icon" />
              <div>
                <h4>Our Location</h4>
                <p>
                  Plot 1, B17 MR-3, Block B, Islamabad, 45230
                  <br />
                  Islamabad, Pakistan, 44100
                </p>
              </div>
            </div>

            {/* Contact Cards */}
            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon phone">
                  <FiPhone />
                </div>
                <div className="contact-details">
                  <h5>Main Line</h5>
                  <a href="tel:051-2765700">051-2765700</a>
                  <a href="tel:+92512296331">+92 51 2296331</a>
                  <a href="tel:+92512296330">+92 51 2296330</a>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon whatsapp">
                  <FaWhatsapp />
                </div>
                <div className="contact-details">
                  <h5>WhatsApp</h5>
                  <a
                    href="https://wa.me/923065038823"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    +92 306 5038823
                  </a>
                  <p className="response-time">Quick response within 5 min</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/doctors")}
              className="button button-secondary"
            >
              <span>Book Appointment</span>
              <FiArrowRight className="button-icon" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWork;
