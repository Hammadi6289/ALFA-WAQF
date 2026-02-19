import React, { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import { photos } from "./GalleryData";
import { Lightbox } from "yet-another-react-lightbox";
import { Link } from "react-router-dom";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/rows.css";
import "./GalleryPage.css";

const GalleryPage = () => {
  const [index, setIndex] = useState(-1);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Photos", icon: "fa-images" },
    { id: "facilities", name: "Facilities", icon: "fa-building" },
    { id: "staff", name: "Medical Staff", icon: "fa-user-doctor" },
    { id: "equipment", name: "Equipment", icon: "fa-stethoscope" },
    { id: "events", name: "Events", icon: "fa-calendar" },
  ];

  const stats = [
    { number: "50+", label: "Photos", icon: "fa-camera" },
    { number: "10+", label: "Departments", icon: "fa-hospital" },
    { number: "24/7", label: "Service", icon: "fa-clock" },
    { number: "5★", label: "Rated", icon: "fa-star" },
  ];

  const filteredPhotos =
    activeCategory === "all"
      ? photos
      : photos.filter((photo) => photo.category === activeCategory);
  return (
    <>
      {/* Hero Section */}
      <div className="gallery-hero">
        <div className="gallery-hero-overlay">
          <h1 className="gallery-hero__title">Our Gallery</h1>
          <p className="gallery-hero__subtitle">
            Explore our state-of-the-art facilities and compassionate care
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="gallery-stats">
        <div className="container">
          <div className="row g-4">
            {stats.map((stat, idx) => (
              <div className="col-6 col-md-3" key={idx}>
                <div className="stat-card">
                  <i className={`fa-solid ${stat.icon} stat-icon`}></i>
                  <h3>{stat.number}</h3>
                  <p>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="gallery-filters">
        <div className="container">
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${
                  activeCategory === cat.id ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <i className={`fa-solid ${cat.icon}`}></i>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Photo Album */}
      <div className="gallery-content">
        <div className="container">
          {filteredPhotos.length > 0 ? (
            <RowsPhotoAlbum
              onClick={({ index: current }) => setIndex(current)}
              photos={filteredPhotos}
              targetRowHeight={200}
            />
          ) : (
            <div className="no-photos">
              <i className="fa-solid fa-images"></i>
              <p>No photos in this category yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        index={index}
        slides={filteredPhotos}
        open={index >= 0}
        close={() => setIndex(-1)}
      />

      {/* Call to Action */}
      <div className="gallery-cta">
        <div className="container text-center">
          <h3>Want to Visit Our Facility?</h3>
          <p>Schedule a tour or book an appointment with our specialists</p>
          <div className="cta-buttons">
            <Link to="/doctors" className="btn button-tertiary">
              Book Appointment
            </Link>
            <Link to="/contact" className="btn button-secondary ms-3">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryPage;
