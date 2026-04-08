import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api/API";
import "./DonorForm.css";

const DonorForm = ({ campaign, amount, onBack }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    donorName: "",
    donorEmail: "",
    donorPhone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.donorName || !formData.donorEmail || !formData.donorPhone) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/donations/session/create", {
        campaignId: campaign._id,
        amount: amount,
        donorName: formData.donorName,
        donorEmail: formData.donorEmail,
        donorPhone: formData.donorPhone,
      });

      if (res.data.success) {
        // Redirect to payment page with sessionId
        navigate(`/donation/payment/${res.data.sessionId}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donor-form-modal">
      <div className="donor-form-overlay" onClick={onBack}></div>
      <div className="donor-form-container">
        <button className="donor-form-close" onClick={onBack}>
          ✕
        </button>
        <h3>Complete Your Donation</h3>
        <p className="donation-summary">
          Donating <strong>PKR {amount.toLocaleString()}</strong> to{" "}
          <strong>{campaign.title}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="donor-form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="donor-form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="donorEmail"
              value={formData.donorEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="donor-form-group">
            <label>Phone Number *</label>
            <input
              type="tel"
              name="donorPhone"
              value={formData.donorPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="donor-form-actions">
            <button
              type="button"
              className="donor-form-back-btn"
              onClick={onBack}
            >
              Back
            </button>
            <button
              type="submit"
              className="button-secondary"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorForm;
