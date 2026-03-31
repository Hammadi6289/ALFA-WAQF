import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllCareers } from "../../redux/actions/careerActions";
import { reset } from "../../redux/slice/careerSlice";
import { FiMapPin, FiBriefcase, FiArrowRight } from "react-icons/fi";
import "./Careers.css";

const AllCareers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { careers, loading, error } = useSelector((state) => state.career);

  useEffect(() => {
    dispatch(getAllCareers());
    dispatch(reset());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="careers-loading-container">
        <div className="spinner"></div>
        <p>Loading career opportunities...</p>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="careers-hero-block">
        <div className="careers-hero-overlay"></div>
        <div className="careers-hero-content">
          <h1>Join Our Team</h1>
          <p>Build your career with Alfalah General Hospital</p>
        </div>
      </div>

      {/* Careers List Section */}
      <div className="careers-section">
        <div className="careers-wrapper-container">
          <div className="careers-section-header">
            <span className="careers-section-tagline">Current Openings</span>
            <h2>Opportunities at Alfalah</h2>
          </div>

          {careers?.length === 0 ? (
            <div className="no-jobs-disclaimer">
              <p>No open positions at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="careers-grid">
              {careers?.map((job) => (
                <div className="career-card" key={job._id}>
                  <div className="career-card-header">
                    <h3>{job.title}</h3>
                  </div>
                  <div className="career-card-details">
                    <div className="careers-job-detail-item">
                      <FiMapPin className="careers-job-detail-icon" />
                      <span>{job.location}</span>
                    </div>
                    <div className="careers-job-detail-item">
                      <FiBriefcase className="careers-job-detail-icon" />
                      <span>Full Time</span>
                    </div>
                  </div>
                  <p className="career-description">
                    {job.aboutUs?.substring(0, 320)}
                  </p>

                  <button
                    className="button-primary"
                    onClick={() => navigate(`/careers/${job._id}`)}
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllCareers;
