import React from "react";
import ContactMessage from "../components/Static/ContactMessage/ContactMessage";
import "./Contact.css";

const Contact = () => {
  return (
    <>
      <div className="contact-hero">
        <div className="contact-hero-overlay">
          <h2 className="contact-hero__title">Contact Us</h2>
          <p className="contact-hero__subtitle">
            Get in touch with Alfalah Family Hospital
          </p>
        </div>
      </div>

      <div className="contact-content">
        <div className="container">
          <div className="row g-4">
            {/* Contact Info Cards */}
            <div className="col-md-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <h5>Visit Us</h5>
                <p>
                  Block B Main-Markaz
                  <br />
                  MPCHS B-17 Islamabad
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <h5>Call Us</h5>
                <p>
                  Emergency: (051) 2765700
                  <br />
                  Available 24/7
                </p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="contact-card">
                <div className="contact-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <h5>Email Us</h5>
                <p>alfalahhospb17@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Map & Form Section */}
          <div className="row mt-5 g-4">
            <div className="col-lg-6">
              <div className="map-container">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2357.933417159859!2d72.82980440000003!3d33.6895342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38dfa365a25046e9%3A0x500a7b4c83e49018!2sAlfalah%20General%20Hospital!5e0!3m2!1sen!2s!4v1768461748638!5m2!1sen!2s"
                  width="100%"
                  height="400"
                  style={{ border: 0, borderRadius: "8px" }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Hospital Location"
                ></iframe>
              </div>
            </div>

            <div className="col-lg-6">
              <ContactMessage />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
