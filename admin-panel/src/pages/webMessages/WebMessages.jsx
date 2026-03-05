import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllWebMessages,
  deleteWebMessage,
} from "../../redux/actions/webMessageActions";
import { FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";
import "./WebMessages.css";

const WebMessages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllWebMessages());
  }, [dispatch]);

  const { webMessages, loading } = useSelector((state) => state.webMessage);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      dispatch(deleteWebMessage(id));
      toast.success("Message deleted successfully");
      // Refresh the list
      dispatch(getAllWebMessages());
    }
  };

  return (
    <Layout>
      <div className="web-messages-page">
        <div className="web-messages-header d-flex justify-content-between align-items-start">
          <div>
            <h2>Customer Messages & Queries</h2>
            <p>View and manage messages received from contact form</p>
          </div>
          <div className="messages-count">
            <span className="messages-badge">
              <i className="fas fa-envelope me-2"></i>
              {webMessages?.length || 0} Messages
            </span>
          </div>
        </div>

        <div className="messages-table-wrapper">
          {loading ? (
            <div className="text-center py-5">
              <div className="loading-spinner">
                <div className="spinner"></div>
                <p>Loading messages...</p>
              </div>
            </div>
          ) : webMessages?.length > 0 ? (
            <table className="messages-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Message</th>
                  <th>Received</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {webMessages.map((msg, index) => (
                  <tr key={msg._id}>
                    <td>{index + 1}</td>

                    {/* Name */}
                    <td>
                      <div className="customer-name-cell">
                        <strong>{msg.name}</strong>
                      </div>
                    </td>

                    {/* Contact */}
                    <td>
                      <div className="contact-info">
                        {msg.contact.includes("@") ? (
                          <a
                            href={`mailto:${msg.contact}`}
                            className="contact-link"
                          >
                            <i className="fas fa-envelope me-2"></i>
                            {msg.contact}
                          </a>
                        ) : (
                          <a
                            href={`tel:${msg.contact}`}
                            className="contact-link"
                          >
                            <i className="fas fa-phone me-2"></i>
                            {msg.contact}
                          </a>
                        )}
                      </div>
                    </td>

                    {/* Message */}
                    <td>
                      <div className="message-content" title={msg.message}>
                        {msg.message.length > 80
                          ? `${msg.message.substring(0, 300)}...`
                          : msg.message}
                      </div>
                    </td>

                    {/* Time Received */}
                    <td>
                      <div className="time-info">
                        <div className="date">
                          {new Date(msg.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </div>
                        <small className="text-muted">
                          {new Date(msg.createdAt).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </small>
                      </div>
                    </td>

                    {/* Delete Action */}
                    <td>
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="delete-btn"
                        title="Delete message"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              <i className="fas fa-inbox empty-icon"></i>
              <p>No messages received yet</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WebMessages;
