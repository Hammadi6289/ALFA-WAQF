import React, { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/authActions";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("appData")) {
      dispatch(getUserData());
    }
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard__header">
          <h1>Dashboard</h1>
          <p className="dashboard__subtitle">
            Alfalah General Hospital Admin Panel
          </p>
        </div>

        <div className="dashboard__welcome text-success">
          <p>
            Welcome back, <strong>{user?.name}</strong>
          </p>
          <span>{user?.email}</span>
          <div>
            <strong className="label text-info">Role : </strong>
            <strong className="text-light bg-danger">Administrator</strong>
          </div>
        </div>

        <div className="dashboard__cards">
          <div className="dashboard__card">
            <h4>Total Users</h4>
            <span>—</span>
          </div>

          <div className="dashboard__card">
            <h4>Total Doctors</h4>
            <span>—</span>
          </div>

          <div className="dashboard__card">
            <h4>Appointments</h4>
            <span>—</span>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
