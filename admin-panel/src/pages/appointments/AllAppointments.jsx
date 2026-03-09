import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { getAllAppointments } from "../../redux/actions/appointmentActions";
import { reset } from "../../redux/slice/appointmentSlice";
import { FaAngleRight } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import "./AllAppointments.css"; // Search Section will be using the css for AllDoctors.css
import { useState } from "react";

const AllAppointments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAllAppointments());
    dispatch(reset());
  }, [dispatch]);

  const { appointments, appointment } = useSelector(
    (state) => state.appointment
  );
  const filteredPatients = appointments?.filter((p) => {
    const searchLower = searchTerm.toLowerCase();

    return (
      p.userId?.name?.toLowerCase().includes(searchLower) ||
      p.patientName?.toLowerCase().includes(searchLower) ||
      p._id?.toLowerCase().includes(searchLower)
    );
  });
  return (
    <Layout>
      <div className="appointments-page">
        <div className="appointments-header d-flex justify-content-between align-items-start">
          <div>
            <h2>Appointments</h2>
            <p>Manage hospital appointments and scheduling</p>
          </div>

          <button
            onClick={() => navigate("/add-appointment-manually")}
            className="add-appointment-btn"
          >
            Add Appointment{" "}
            <FaAngleRight className="FaAngleRight-btn-icon" size={16} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-filter-section">
        <div className="search-bar">
          <FiSearch className="search-icon" size={20} />

          <input
            type="text"
            placeholder="Search Patients"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>
        <div className="search-results-count">
          {searchTerm && `${filteredPatients?.length || 0} Patients found`}
        </div>
      </div>

      <div className="appointments-table-wrapper">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Appt ID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Details</th>
            </tr>
          </thead>

          <tbody>
            {filteredPatients?.map((appointment, index) => (
              <tr key={appointment._id}>
                <td>{index + 1}</td>

                {/* Appointment ID */}
                <td className="appointment-id-cell">
                  <div className="d-flex flex-column">
                    <strong className="text-muted">
                      {appointment._id.substring(0, 12)}..
                    </strong>
                    <small className="text-muted">
                      {new Date(appointment.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                </td>

                <td>
                  <div className="date-cell">
                    {appointment.slotDate
                      ? (() => {
                          // Parse "25-01-2026" to Date object
                          const [day, month, year] =
                            appointment.slotDate.split("-");
                          const date = new Date(`${year}-${month}-${day}`);

                          // Format to nice readable string
                          return date.toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          });
                        })()
                      : "N/A"}
                  </div>
                </td>

                <td>
                  <div className="time-badge">
                    {appointment.slotTime
                      ? (() => {
                          const [hours, minutes] =
                            appointment.slotTime.split(":");
                          const hour = parseInt(hours);
                          const ampm = hour >= 12 ? "PM" : "AM";
                          const hour12 = hour % 12 || 12;
                          return `${hour12}:${minutes} ${ampm}`;
                        })()
                      : "N/A"}
                  </div>
                </td>

                {/* Patient Info*/}
                <td>
                  <div className="d-flex flex-column">
                    {/* <strong>Patient Name</strong> */}

                    <small className="text-muted">
                      {appointment.userId?.name || "N/A"}
                    </small>
                  </div>
                </td>

                {/* Doctor Info - You might need to fetch doctor data */}
                <td>
                  <div className="d-flex flex-column">
                    {appointment.doctorId?.name || "N/A"}
                    <small className="text-muted">
                      {appointment.doctorId?.speciality || "N/A"}
                    </small>
                  </div>
                </td>

                <td className="amount-cell">
                  <small>Rs. {appointment.amount}/- </small>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`status-badge ${
                      appointment.status === "completed"
                        ? "completed"
                        : appointment.status === "pending"
                        ? "pending"
                        : "cancel"
                    }`}
                  >
                    {appointment.status.charAt(0).toUpperCase() +
                      appointment.status.slice(1)}
                  </span>
                </td>

                {/* Payment Status */}
                <td>
                  <span
                    className={`payment-badge ${
                      appointment.payment ? "completed" : "cancel"
                    }`}
                  >
                    {appointment.payment ? "Paid" : "Pending"}
                  </span>
                </td>

                <td>
                  <Link
                    to={`/appointment-details/${appointment._id}`}
                    className="view-details-link"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AllAppointments;
