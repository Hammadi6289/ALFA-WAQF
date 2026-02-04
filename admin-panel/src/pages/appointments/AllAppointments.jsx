import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllAppointments } from "../../redux/actions/appointmentActions";
import { reset } from "../../redux/slice/appointmentSlice";
import { FaAngleRight } from "react-icons/fa";
import "./AllAppointments.css";

const AllAppointments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllAppointments());
    dispatch(reset());
  }, [dispatch]);

  const { appointments, appointment } = useSelector(
    (state) => state.appointment
  );
  return (
    <Layout>
      <div className="appointments-page">
        <div className="appointments-header d-flex justify-content-between align-items-start">
          <div>
            <h2>Appointments</h2>
            <p>Manage hospital appointments and scheduling</p>
          </div>

          <button
            onClick={() => navigate("/add-appointment")} // If you have this route
            className="add-appointment-btn"
          >
            Add Appointment{" "}
            <FaAngleRight className="FaAngleRight-btn-icon" size={16} />
          </button>
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
            {appointments?.map((appointment, index) => (
              <tr key={appointment._id}>
                <td>{index + 1}</td>

                {/* Appointment ID */}
                <td className="appointment-id-cell">
                  <div className="d-flex flex-column">
                    <strong className="text-muted">
                      {appointment._id.substring(0, 8)}...
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

                {/* Patient Info - You might need to fetch patient data */}
                <td>
                  <div className="d-flex flex-column">
                    <strong>Patient Name</strong>
                    <small className="text-muted">
                      {appointment.userId?.name || "N/A"}
                    </small>
                  </div>
                </td>

                {/* Doctor Info - You might need to fetch doctor data */}
                <td>
                  <div className="d-flex flex-column">
                    <strong>Dr. {appointment?.doctorName || "N/A"}</strong>
                    <small className="text-muted">
                      {appointment.doctorId?.speciality || "N/A"}
                    </small>
                  </div>
                </td>

                <td className="amount-cell">
                  <strong>Rs. {appointment.amount}/-</strong>
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
