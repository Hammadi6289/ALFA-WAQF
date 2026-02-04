import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/authActions";
import { getStats } from "../redux/actions/userActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("appData")) {
      dispatch(getUserData());
      dispatch(getStats());
    }
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  const { stats } = useSelector((state) => state.user);

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard__header">
          <h1 className="dashboard__title">Dashboard</h1>
          <p className="dashboard__subtitle">
            <i className="fas fa-hospital me-2"></i>
            Alfalah General Hospital Admin Panel
          </p>
        </div>

        <div className="dashboard__welcome-card">
          <div className="welcome-header">
            <i className="fas fa-user-md welcome-icon"></i>
            <div>
              <p className="welcome-greeting">
                Welcome back,{" "}
                <strong className="user-name">{user?.name}</strong>
              </p>
              <span className="user-email">{user?.email}</span>
            </div>
          </div>
          <div className="role-badge">
            <span className="role-label">Role:</span>
            <span className="role-value">
              {user?.isAdmin ? "Administrator" : "User"}
            </span>
          </div>
        </div>

        <div className="dashboard__cards">
          <div className="stat-card users-card">
            <div className="stat-icon">
              <i className="fas fa-users"></i>
            </div>
            <h4 className="stat-value">{stats?.totalUsers}</h4>{" "}
            <span className="stat-label">Total Users</span>
          </div>

          <div className="stat-card doctors-card">
            <div className="stat-icon">
              <i className="fas fa-user-md"></i>
            </div>
            <h4 className="stat-value">{stats?.totalDoctors}</h4>
            <span className="stat-label">Total Doctors</span>
          </div>

          <div className="stat-card appointments-card">
            <div className="stat-icon">
              <i className="fas fa-calendar-check"></i>
            </div>
            <h4 className="stat-value">{stats?.totalAppointments}</h4>
            <span className="stat-label">Appointments</span>
          </div>

          <div className="stat-card earnings-card">
            <div className="stat-icon">
              <i className="fas fa-rupee-sign"></i>
            </div>
            <h4 className="stat-value">Rs. {stats?.earnings}/-</h4>{" "}
            <span className="stat-label">Total Earnings</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
