import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions/userActions";
import { useParams } from "react-router";
import "./UserDetails.css";

const UserDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const { user, appointments } = useSelector((state) => state.user);
  return (
    <Layout>
      <div className="user-details-page">
        {/* Header */}
        <div className="user-details-header">
          <h3>User Details</h3>
          <p className="text-muted text-center">
            Alfalah General Hospital Admin Panel
          </p>
        </div>

        {/* User Info Card */}
        <div className="user-info-card">
          <div className="user-image-wrapper">
            {user?.image ? (
              <img
                src={`data:image/jpeg;base64,${user.image}`}
                alt="userImage"
                className="user-image"
              />
            ) : (
              <div className="user-image-placeholder">No Image</div>
            )}
          </div>
          <div className="user-details">
            <h4>{user?.name}</h4>
            <p>
              <strong>Email:</strong> {user?.email}
            </p>
            <p>
              <strong>Phone:</strong> {user?.phone || "Not Available"}
            </p>
            <p>
              <strong>Address:</strong> {user?.address || "Not Available"}
            </p>
            <p>
              <strong>Type:</strong>{" "}
              <span
                className={`status-badge ${
                  user?.isAdmin ? "active" : "inactive"
                }`}
              >
                {user?.isAdmin ? "Admin" : "Normal"}
              </span>
            </p>
          </div>
        </div>

        {/* Appointments */}
        <div className="appointments-section">
          <h3>Appointments</h3>
          {appointments?.length > 0 ? (
            <div className="appointments-grid">
              {appointments?.map((appt, idx) => (
                <div key={idx} className="appointment-card">
                  <div className="appointment-header">
                    <span className="appointment-sn">#{idx + 1}</span>
                    <span
                      className={`status-badge ${
                        appt?.status ? appt.status.toLowerCase() : "pending"
                      }`}
                    >
                      {appt?.status
                        ? appt.status.charAt(0).toUpperCase() +
                          appt.status.slice(1)
                        : "Pending"}
                    </span>
                  </div>
                  <p>
                    <strong>Date:</strong> {appt?.slotDate}
                  </p>
                  <p>
                    <strong>Time:</strong> {appt?.slotTime || "N/A"}
                  </p>
                  <p>
                    <strong>Doctor:</strong> {appt?.doctorId}
                  </p>
                  <p>
                    <strong>Fee:</strong> Rs. {appt?.amount}
                    /-
                  </p>
                  <p>
                    <strong>Payment:</strong>{" "}
                    <span
                      className={`status-badge ${
                        appt?.payment ? "inactive" : "active"
                      }`}
                    >
                      {appt?.payment ? "Not Paid" : "Paid"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <h5>No appointments for this user</h5>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UserDetails;
