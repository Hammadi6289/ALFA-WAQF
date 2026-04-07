// src/pages/Specialties/SpecialtyDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaStethoscope,
  FaUserMd,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import "./SpecialtyDetails.css";
import specialtiesData from "./specialtiesData.js";

const SpecialtyDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [specialty, setSpecialty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundSpecialty = specialtiesData.find((s) => s.slug === slug);
    setSpecialty(foundSpecialty);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!specialty) {
    return (
      <div className="not-found-container">
        <h2>Specialty Not Found</h2>
        <p>We couldn't find the specialty you're looking for.</p>
        <Link to="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div
        className="specialty-hero"
        style={{ backgroundImage: `url(${specialty.image})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{specialty.heroTitle || `${specialty.name} Care at Alfalah`}</h1>
          <p>{specialty.heroDescription || specialty.description}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="specialty-action-buttons-container">
        <div className="specialty-action-buttons">
          <a
            href={specialty.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="specialty-action-btn location-btn"
          >
            <FaMapMarkerAlt className="btn-icon" />
            <span>Get Directions</span>
          </a>
          <Link
            to={specialty.appointmentUrl}
            className="specialty-action-btn appointment-btn"
          >
            <FaCalendarAlt className="btn-icon" />
            <span>Book Appointment</span>
          </Link>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-section">
        <div className="timeline-container">
          <h2 className="timeline-title">Your Journey with {specialty.name}</h2>
          <p className="timeline-subtitle">
            Experience world-class care from consultation to recovery
          </p>

          <div className="timeline-wrapper">
            <div className="timeline">
              {/* Timeline Item 1 */}
              <div className="timeline-item">
                <div className="timeline-icon">
                  <FaStethoscope />
                </div>
                <div className="timeline-content">
                  <h3>Initial Consultation</h3>
                  <p>
                    Meet with our specialist for a comprehensive evaluation of
                    your condition. We take time to understand your medical
                    history and concerns.
                  </p>
                  <div className="timeline-details">
                    <span>Duration: 30-45 mins</span>
                    <span>In-person or Telehealth available</span>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="timeline-item">
                <div className="timeline-icon">
                  <FaUserMd />
                </div>
                <div className="timeline-content">
                  <h3>Diagnosis & Treatment Plan</h3>
                  <p>
                    Advanced diagnostic testing and personalized treatment plan
                    tailored to your specific needs and lifestyle.
                  </p>
                  <div className="timeline-details">
                    <span>Includes: Lab tests, Imaging if needed</span>
                    <span>Follow-up scheduled</span>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="timeline-item">
                <div className="timeline-icon">
                  <FaClock />
                </div>
                <div className="timeline-content">
                  <h3>Treatment & Follow-up</h3>
                  <p>
                    Regular monitoring and adjustments to your treatment plan as
                    needed. Our team is always available for questions.
                  </p>
                  <div className="timeline-details">
                    <span>Progress tracking</span>
                    <span>24/7 support available</span>
                  </div>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="timeline-item">
                <div className="timeline-icon">
                  <FaCheckCircle />
                </div>
                <div className="timeline-content">
                  <h3>Recovery & Wellness</h3>
                  <p>
                    Ongoing support to ensure optimal recovery and long-term
                    wellness. Preventive care planning for your future health.
                  </p>
                  <div className="timeline-details">
                    <span>Wellness programs</span>
                    <span>Preventive screenings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="specialty-info-section">
        <div className="info-grid">
          <div className="info-card">
            <h3>About {specialty.name}</h3>
            <p>{specialty.about}</p>
          </div>
          <div className="info-card">
            <h3>Treatments & Services</h3>
            <ul className="treatments-list">
              {specialty.treatments?.map((treatment, idx) => (
                <li key={idx}>
                  <FaCheckCircle className="list-icon" />
                  {treatment}
                </li>
              ))}
            </ul>
          </div>
          <div className="info-card">
            <h3>Our Timing and Specialists</h3>
            <div className="clinic-hours">
              <FaClock />
              <span>{specialty.clinicHours}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialtyDetails;
