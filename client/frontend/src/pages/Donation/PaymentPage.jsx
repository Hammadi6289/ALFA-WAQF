import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../../Api/API";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await API.get(`/donations/session/${sessionId}`);
        if (res.data.success) {
          setSession(res.data.session);
        } else {
          navigate("/donate");
        }
      } catch (error) {
        console.error(error);
        navigate("/donate");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId, navigate]);

  const handlePayFastPayment = () => {
    setProcessing(true);
    alert("PayFast integration coming soon!");
  };

  if (loading) {
    return <div className="payment-loading">Loading payment details...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <div className="donation-payment-page">
        <div className="donation-payment-container">
          <h1>Complete Your Donation</h1>

          {/* Order Summary */}
          <div className="payment-order-summary">
            <h2>Order Summary</h2>
            <div className="payment-summary-card">
              <div className="payment-summary-row">
                <span>Campaign:</span>
                <strong>{session.campaignId?.title}</strong>
              </div>
              <div className="payment-summary-row">
                <span>Donation Amount:</span>
                <strong>PKR {session.amount.toLocaleString()}</strong>
              </div>
              <div className="payment-summary-row">
                <span>Donor Name:</span>
                <span>
                  {session.donorTitle} {session.donorName}
                </span>
              </div>
              <div className="payment-summary-row">
                <span>Email:</span>
                <span>{session.donorEmail}</span>
              </div>
              <div className="payment-summary-row">
                <span>Phone:</span>
                <span>{session.donorPhone}</span>
              </div>
              {session.donorAddress && (
                <div className="payment-summary-row">
                  <span>Address:</span>
                  <span>{session.donorAddress}</span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Button */}
          <div className="payment-button-section">
            <button
              className="payment-payfast-btn button-secondary"
              onClick={handlePayFastPayment}
              disabled={processing}
            >
              {processing ? "Processing..." : "Pay with PayFast"}
            </button>
            <button
              className="payment-back-btn"
              onClick={() => navigate("/donation/checkout")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
