import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllApplications,
  updateApplicationStatus,
} from "../../redux/actions/careerActions";
import { reset } from "../../redux/slice/careerSlice";
import Layout from "../../components/Layout/Layout";
import { FiDownload, FiEye, FiMail, FiPhone, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";
import "./AdminCareers.css";

const Applications = () => {
  const { jobId } = useParams();
  const dispatch = useDispatch();
  const { applications, loading, success, error } = useSelector(
    (state) => state.career
  );
  const [selectedApp, setSelectedApp] = useState(null);

  useEffect(() => {
    dispatch(getAllApplications());
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Application status updated");
      dispatch(getAllApplications());
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch]);

  const handleStatusUpdate = (id, status) => {
    dispatch(updateApplicationStatus({ id, status }));
  };

  const downloadResume = (base64Data, fileName) => {
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${base64Data}`;
    link.download = fileName;
    link.click();
  };

  const filteredApps = jobId
    ? applications?.filter((app) => app.jobId === jobId)
    : applications;

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "reviewed":
        return "status-reviewed";
      case "shortlisted":
        return "status-shortlisted";
      case "rejected":
        return "status-rejected";
      default:
        return "status-pending";
    }
  };

  return (
    <Layout>
      <div className="admin-applications-page">
        <div className="page-header">
          <div>
            <h2>Job Applications</h2>
            <p>Review and manage candidate applications</p>
          </div>
        </div>

        <div className="applications-table-wrapper">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : filteredApps?.length === 0 ? (
            <div className="empty-state">
              <p>No applications received yet.</p>
            </div>
          ) : (
            <table className="applications-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Applicant</th>
                  <th>Contact</th>
                  <th>Job Title</th>
                  <th>Applied Date</th>
                  <th>Status</th>
                  <th>Resume</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps?.map((app, index) => (
                  <tr key={app._id}>
                    <td>{index + 1}</td>
                    <td className="applicant-cell">
                      <div className="applicant-info">
                        <FiUser className="applicant-icon" />
                        <div>
                          <strong>{app.name}</strong>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="contact-info">
                        <div className="contact-item">
                          <FiMail size={14} />
                          <span>{app.email}</span>
                        </div>
                        <div className="contact-item">
                          <FiPhone size={14} />
                          <span>{app.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="job-title-badge">{app.jobTitle}</span>
                    </td>
                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td>
                      <select
                        className={`status-select ${getStatusBadgeClass(
                          app.status
                        )}`}
                        value={app.status}
                        onChange={(e) =>
                          handleStatusUpdate(app._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td>
                      {app.resume ? (
                        <button
                          className="download-btn"
                          onClick={() =>
                            downloadResume(app.resume, `${app.name}_resume.pdf`)
                          }
                          title="Download Resume"
                        >
                          <FiDownload />
                          Download
                        </button>
                      ) : (
                        <span className="no-resume">No resume</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="view-details-btn"
                        onClick={() => setSelectedApp(app)}
                        title="View Details"
                      >
                        <FiEye />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Application Details Modal */}
      {selectedApp && (
        <div className="modal-overlay" onClick={() => setSelectedApp(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Application Details</h3>
            <div className="modal-body">
              <div className="detail-row">
                <strong>Name:</strong>
                <span>{selectedApp.name}</span>
              </div>
              <div className="detail-row">
                <strong>Email:</strong>
                <span>{selectedApp.email}</span>
              </div>
              <div className="detail-row">
                <strong>Phone:</strong>
                <span>{selectedApp.phone}</span>
              </div>
              <div className="detail-row">
                <strong>Job Title:</strong>
                <span>{selectedApp.jobTitle}</span>
              </div>
              <div className="detail-row">
                <strong>Applied Date:</strong>
                <span>{new Date(selectedApp.createdAt).toLocaleString()}</span>
              </div>
              <div className="detail-row">
                <strong>Status:</strong>
                <span
                  className={`status-badge ${getStatusBadgeClass(
                    selectedApp.status
                  )}`}
                >
                  {selectedApp.status}
                </span>
              </div>
            </div>
            <button
              className="close-modal"
              onClick={() => setSelectedApp(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Applications;
