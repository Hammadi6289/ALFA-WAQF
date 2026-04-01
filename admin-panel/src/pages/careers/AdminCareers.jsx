import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllCareersAdmin,
  deleteCareer,
} from "../../redux/actions/careerActions";
import { reset } from "../../redux/slice/careerSlice";
import Layout from "../../components/Layout/Layout";
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiMapPin } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa";
import toast from "react-hot-toast";
import "./AdminCareers.css";
import { useNavigate } from "react-router";

const AdminCareers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { careers, loading, success, error } = useSelector(
    (state) => state.career
  );
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    dispatch(getAllCareersAdmin());
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Operation completed successfully");
      dispatch(getAllCareersAdmin());
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      dispatch(deleteCareer(id));
    }
  };

  return (
    <Layout>
      <div className="admin-careers-page">
        <div className="appointments-header d-flex justify-content-between align-items-start">
          <div>
            <h2>Job Postings</h2>
            <p>Manage career opportunities at Alfalah Hospital</p>
          </div>

          <button
            onClick={() => navigate("/admin/add-career")}
            className="add-appointment-btn"
          >
            Add New Job{" "}
            <FaAngleRight className="FaAngleRight-btn-icon" size={16} />
          </button>
        </div>

        <div className="careers-table-wrapper">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : careers?.length === 0 ? (
            <div className="empty-state">
              <p>No job postings yet. Click "Add New Job" to create one.</p>
            </div>
          ) : (
            <table className="careers-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {careers?.map((job, index) => (
                  <tr key={job._id}>
                    <td>{index + 1}</td>
                    <td className="job-title-cell">
                      <strong>{job.title}</strong>
                    </td>
                    <td>
                      <div className="location-badge">
                        <FiMapPin />
                        <span>{job.location}</span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          job.isActive ? "active" : "inactive"
                        }`}
                      >
                        {job.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{new Date(job.createdAt).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <Link
                        to={`/admin/careers/${job._id}/applications`}
                        className="action-btn view-btn"
                        title="View Applications"
                      >
                        <FiEye />
                      </Link>
                      <Link
                        to={`/admin/edit-career/${job._id}`}
                        className="action-btn edit-btn"
                        title="Edit Job"
                      >
                        <FiEdit2 />
                      </Link>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="action-btn delete-btn"
                        title="Delete Job"
                      >
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminCareers;
