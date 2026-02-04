import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointmentDetails,
  updateAppointmentStatus,
} from "../../redux/actions/appointmentActions";
import toast from "react-hot-toast";
import "./AppointmentDetails.css";

const AppointmentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appointmentStatus, setAppointmentStatus] = useState("");

  useEffect(() => {
    dispatch(getAppointmentDetails(id));
  }, [dispatch, id]);

  const { appointment, error, loading, success } = useSelector(
    (state) => state.appointment
  );
  useEffect(() => {
    if (appointment) {
      setAppointmentStatus(appointment?.bookingStatus);
    }
  }, [appointment]);

  const handleUpdateStatus = () => {
    // dispatch(updateAppointmentStatus(id, appointmentStatus));
    dispatch(
      updateAppointmentStatus({
        id,
        appointmentStatus: appointmentStatus.toLowerCase(),
      })
    );
    if (success) {
      toast.success("Status updated successfully");
      navigate("/all-appointments");
    }
    if (error) {
      toast.error(error);
    }
  };
  return (
    <Layout>
      <div className="appointments-page">
        <div className="appointments-header d-flex justify-content-between align-items-start">
          <div>
            <h2>Appointment Details</h2> {/* Change from h1 to h2 */}
            <p>Alfalah General Hospital Admin Panel</p> {/* Add this */}
          </div>
        </div>
        <div className="appointment-details-grid">
          <div className="detail-card">
            <div className="detail-label">Client Information</div>
            <div className="detail-group">
              <span className="detail-item-label">Name:</span>
              <span className="detail-item-value">
                {appointment?.clientName}
              </span>
            </div>
            <div className="detail-group">
              <span className="detail-item-label">Phone:</span>
              <span className="detail-item-value">
                {appointment?.clientPhone}
              </span>
            </div>
            <div className="detail-group">
              <span className="detail-item-label">Email:</span>
              <span className="detail-item-value">
                {appointment?.clientEmail}
              </span>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-label">Doctor Information</div>
            <div className="detail-group">
              <span className="detail-item-label">Name:</span>
              <span className="detail-item-value">
                {appointment?.doctorName}
              </span>
            </div>
            <div className="detail-group">
              <span className="detail-item-label">Phone:</span>
              <span className="detail-item-value">
                {appointment?.doctorPhone}
              </span>
            </div>
            <div className="detail-group">
              <span className="detail-item-label">Email:</span>
              <span className="detail-item-value">
                {appointment?.doctorEmail}
              </span>
            </div>
          </div>

          <div className="detail-card">
            <div className="detail-label">Appointment Details</div>
            <div className="detail-group">
              <span className="detail-item-label">Date:</span>
              <span className="detail-item-value">
                {appointment?.bookingDate}
              </span>
            </div>
            <div className="detail-group">
              <span className="detail-item-label">Time:</span>
              <span className="detail-item-value">
                {appointment?.bookingTime}
              </span>
            </div>
            <div className="detail-group">
              <span className="detail-item-label">Amount:</span>
              <span className="detail-item-value amount-highlight">
                Rs. {appointment?.amount}/-
              </span>
            </div>
            <div className="detail-group">
              <span className="detail-item-label">Status:</span>
              <span className={`status-badge ${appointment?.bookingStatus}`}>
                {appointment?.bookingStatus?.charAt(0).toUpperCase() +
                  appointment?.bookingStatus?.slice(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="status-update-card">
          <h4 className="section-title">
            <i className="fas fa-sync-alt me-2"></i>
            Update Appointment Status
          </h4>
          <div className="status-select-wrapper">
            <label className="form-label">Select New Status</label>
            <div className="status-options">
              {["pending", "completed", "cancelled"].map((status) => (
                <button
                  key={status}
                  className={`status-option-btn ${
                    appointmentStatus === status ? "active" : ""
                  }`}
                  onClick={() => setAppointmentStatus(status)}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleUpdateStatus}
            className="doctor-update-btn w-100 mt-3"
          >
            <i className="fas fa-check-circle me-2"></i>
            Confirm Status Update
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AppointmentDetails;
