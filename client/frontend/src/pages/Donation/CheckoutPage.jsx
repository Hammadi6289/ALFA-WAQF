import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api/API";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [donationData, setDonationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    donorName: "",
    donorEmail: "",
    donorPhone: "",
    donorAddress: "",
  });

  useEffect(() => {
    const pending = localStorage.getItem("pendingDonation");
    if (!pending) {
      navigate("/donate");
      return;
    }
    setDonationData(JSON.parse(pending));
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.donorName || !formData.donorEmail || !formData.donorPhone) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await API.post("/donations/session/create", {
        campaignId: donationData.campaignId,
        amount: donationData.amount,
        donorTitle: formData.title,
        donorName: formData.donorName,
        donorEmail: formData.donorEmail,
        donorPhone: formData.donorPhone,
        donorAddress: formData.donorAddress,
      });

      if (res.data.success) {
        localStorage.removeItem("pendingDonation");
        navigate(`/donation/payment/${res.data.sessionId}`);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!donationData) {
    return <div className="checkout-loading">Loading...</div>;
  }

  return (
    <>
      <div className="donation-checkout-page">
        <div className="donation-checkout-container">
          {/* Order Summary */}
          <div className="checkout-order-summary">
            <h2>Your Donation</h2>
            <div className="checkout-summary-card">
              <p className="checkout-summary-campaign">
                {donationData.campaignTitle}
              </p>
              <p className="checkout-summary-amount">
                Amount:{" "}
                <strong>PKR {donationData.amount.toLocaleString()}</strong>
              </p>
            </div>
          </div>

          {/* Donor Form */}
          <div className="checkout-donor-form">
            <h2>Your Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="checkout-form-row">
                <div className="checkout-form-group">
                  <label>Title</label>
                  <select
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Miss.">Miss.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                </div>
                <div className="checkout-form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    name="donorName"
                    value={formData.donorName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="checkout-form-row">
                <div className="checkout-form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="donorEmail"
                    value={formData.donorEmail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="checkout-form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="donorPhone"
                    value={formData.donorPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="checkout-form-group">
                <label>Address</label>
                <textarea
                  name="donorAddress"
                  rows="3"
                  value={formData.donorAddress}
                  onChange={handleChange}
                  placeholder="Street address, city, postal code"
                />
              </div>

              <div className="checkout-form-actions">
                <button
                  type="button"
                  className="checkout-back-btn"
                  onClick={() => navigate("/donate")}
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="checkout-continue-btn button-secondary"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Continue to Payment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
