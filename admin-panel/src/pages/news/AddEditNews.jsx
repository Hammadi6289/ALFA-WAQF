import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addNews,
  updateNews,
  getAllNewsAdmin,
} from "../../redux/actions/newsActions";
import { reset } from "../../redux/slice/newsSlice";
import Layout from "../../components/Layout/Layout";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import "./AdminNews.css";

const AddEditNews = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { news, loading, success, error } = useSelector((state) => state.news);
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "general",
    image: null,
    publishedDate: new Date().toISOString().split("T")[0],
    isActive: true,
  });

  useEffect(() => {
    if (isEdit) {
      dispatch(getAllNewsAdmin());
    }
  }, [dispatch, isEdit]);

  useEffect(() => {
    if (isEdit && news?.length > 0) {
      const item = news.find((n) => n._id === id);
      if (item) {
        setFormData({
          title: item.title,
          content: item.content,
          category: item.category,
          image: null,
          publishedDate:
            item.publishedDate?.split("T")[0] ||
            new Date().toISOString().split("T")[0],
          isActive: item.isActive,
        });
      }
    }
  }, [isEdit, news, id]);

  useEffect(() => {
    if (success) {
      toast.success(isEdit ? "News updated!" : "News added!");
      dispatch(reset());
      navigate("/admin/news");
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch, navigate, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!isEdit && !formData.image) {
      toast.error("Please select a featured image");
      return;
    }

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("content", formData.content);
    submitData.append("category", formData.category);
    submitData.append("publishedDate", formData.publishedDate);
    submitData.append("isActive", formData.isActive);

    if (formData.image) {
      submitData.append("image", formData.image);
    }

    if (isEdit) {
      dispatch(updateNews({ id, formData: submitData }));
    } else {
      dispatch(addNews(submitData));
    }
  };

  return (
    <Layout>
      <div className="add-edit-news-page">
        <div className="admin-news-page-header">
          <button onClick={() => navigate("/admin/news")} className="back-btn">
            <FiArrowLeft />
            Back to News
          </button>
          <h2>{isEdit ? "Edit News" : "Add News"}</h2>
        </div>

        <div className="news-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter news title"
                required
              />
            </div>

            <div className="form-group">
              <label>Full Content *</label>
              <textarea
                name="content"
                rows="10"
                value={formData.content}
                onChange={handleChange}
                placeholder="Write the full news article here..."
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="general">General</option>
                  <option value="announcement">Announcement</option>
                  <option value="event">Event</option>
                  <option value="achievement">Achievement</option>
                </select>
              </div>
              <div className="form-group">
                <label>Published Date</label>
                <input
                  type="date"
                  name="publishedDate"
                  value={formData.publishedDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Featured Image *</label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
              />
              {isEdit && !formData.image && (
                <small className="form-hint">
                  Leave empty to keep current image
                </small>
              )}
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                Active (visible on website)
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate("/admin/news")}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Saving..." : isEdit ? "Update News" : "Add News"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddEditNews;
