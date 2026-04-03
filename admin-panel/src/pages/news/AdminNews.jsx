import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllNewsAdmin, deleteNews } from "../../redux/actions/newsActions";
import { reset } from "../../redux/slice/newsSlice";
import Layout from "../../components/Layout/Layout";
import { FiEdit2, FiTrash2, FiPlus, FiEye } from "react-icons/fi";
import toast from "react-hot-toast";
import "./AdminNews.css";

const AdminNews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { news, loading, success, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(getAllNewsAdmin());
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Operation completed successfully");
      dispatch(getAllNewsAdmin());
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this news article?")) {
      dispatch(deleteNews(id));
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <Layout>
      <div className="admin-news-page">
        <div className="admin-news-page-header">
          <div>
            <h2>News Management</h2>
            <p>Create and manage hospital news and announcements</p>
          </div>
          <button
            className="add-btn"
            onClick={() => navigate("/admin/news/add")}
          >
            <FiPlus />
            Add News
          </button>
        </div>

        <div className="news-table-wrapper">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : news?.length === 0 ? (
            <div className="empty-state">
              <p>No news articles yet. Click "Add News" to create one.</p>
            </div>
          ) : (
            <table className="news-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Published Date</th>
                  <th>Views</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {news?.map((item) => (
                  <tr key={item._id}>
                    <td className="mews-image-cell">
                      <img
                        src={`data:image/jpeg;base64,${item.image}`}
                        alt={item.title}
                        className="news-thumb"
                      />
                    </td>
                    <td className="news-title-cell">{item.title}</td>
                    <td>
                      <span className="news-category-badge">
                        {item.category}
                      </span>
                    </td>
                    <td>{formatDate(item.publishedDate)}</td>
                    <td>{item.views || 0}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          item.isActive ? "active" : "inactive"
                        }`}
                      >
                        {item.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <Link
                        to={`/news/${item.slug}`}
                        target="_blank"
                        className="news-action-btn news-view-btn"
                        title="View on site"
                      >
                        <FiEye />
                      </Link>
                      <Link
                        to={`/admin/news/edit/${item._id}`}
                        className="news-action-btn news-edit-btn"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="news-action-btn news-delete-btn"
                        title="Delete"
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

export default AdminNews;
