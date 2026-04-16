import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCareerDetails,
  submitApplication,
} from "../../redux/actions/careerActions";
import { reset } from "../../redux/slice/careerSlice";
import {
  FiMapPin,
  FiBriefcase,
  FiMail,
  FiPhone,
  FiUser,
  FiUpload,
  FiArrowLeft,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import "./Careers.css";

const CareerDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { career, loading, success, error } = useSelector(
    (state) => state.career
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resume: "",
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Create the data object for Google
  const jobSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    title: career?.title, // e.g., "Software Engineer"
    // jobTitle: career?.title,
    description: career?.theRole, // Must be the full job description
    identifier: {
      "@type": "PropertyValue",
      name: "Alfalah Waqf",
      value: "69cbaaabf6f8bba87a9793d4",
    },
    datePosted: "2024-03-03",
    hiringOrganization: {
      "@type": "Organization",
      name: "Alfalah Waqf",
      sameAs: "https://alfalah-waqf.vercel.app",
    },
    jobLocation: {
      "@type": "Islamabad",
      address: {
        "@type": "44000",
        addressLocality: career?.location,
        addressCountry: "PK",
      },
    },
  };

  useEffect(() => {
    dispatch(getCareerDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (success) {
      toast.success("Application submitted successfully!");
      setFormData({ name: "", email: "", phone: "", resume: "" });
      setResumeFile(null);
      dispatch(reset());
      setTimeout(() => {
        navigate("/careers");
      }, 2000);
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      // Convert to base64 for storage
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        setFormData({
          ...formData,
          resume: base64String,
        });
      };
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!resumeFile) {
      toast.error("Please upload your resume");
      return;
    }

    setSubmitting(true);

    const applicationData = {
      jobId: id,
      jobTitle: career?.title,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      resume: formData.resume,
    };

    dispatch(submitApplication(applicationData));
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading job details...</p>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="not-found-container">
        <h2>Job Not Found</h2>
        <p>The position you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/careers")} className="back-btn">
          Back to Careers
        </button>
      </div>
    );
  }

  return (
    <>
      {/* 3. Inject the data into the <head> of your site */}
      {career && (
        <Helmet>
          <title>{career.title} | Alfalah Careers</title>
          <script type="application/ld+json">
            {JSON.stringify(jobSchema)}
          </script>
        </Helmet>
      )}
      <div className="career-details-page">
        <div className="container">
          {/* Back Button */}
          <button onClick={() => navigate("/careers")} className="back-to-list">
            <FiArrowLeft />
            Back to All Jobs
          </button>

          {/* Job Details */}
          <div className="job-details-card">
            <h1>{career.title}</h1>
            <div className="job-meta">
              <div className="meta-item">
                <FiMapPin />
                <span>{career.location}</span>
              </div>
              <div className="meta-item">
                <FiBriefcase />
                <span>Full Time</span>
              </div>
            </div>

            <div className="job-section">
              <h3>About Us</h3>
              <p>{career.aboutUs}</p>
            </div>

            <div className="job-section">
              <h3>The Role</h3>
              <p>{career.theRole}</p>
            </div>

            <div className="job-section">
              <h3>What You'll Do</h3>
              <ul className="bulleted-list">
                {career.whatYoullDo?.split("\n").map((item, index) => (
                  <li key={index}>{item.replace("•", "").trim()}</li>
                ))}
              </ul>
            </div>

            <div className="job-section">
              <h3>What You'll Bring</h3>
              <ul className="bulleted-list">
                {career.whatYoullBring?.split("\n").map((item, index) => (
                  <li key={index}>{item.replace("•", "").trim()}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Application Form */}
          <div className="application-form-card">
            <h3>Apply for this Position</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Full Name *</label>
                <div className="input-wrapper">
                  <FiUser className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <div className="input-wrapper">
                  <FiMail className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <div className="input-wrapper">
                  <FiPhone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Resume/CV *</label>
                <div className="file-input-wrapper">
                  <FiUpload className="upload-icon" />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    required
                  />
                  <span className="file-name">
                    {resumeFile
                      ? resumeFile.name
                      : "Upload your resume (PDF, DOC)"}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CareerDetails;
