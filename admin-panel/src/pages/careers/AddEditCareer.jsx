import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCareer,
  updateCareer,
  getAllCareersAdmin,
} from "../../redux/actions/careerActions";
import { reset } from "../../redux/slice/careerSlice";
import Layout from "../../components/Layout/Layout";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import "./AdminCareers.css";

const AddEditCareer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { careers, loading, success, error } = useSelector(
    (state) => state.career
  );
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    aboutUs: "",
    theRole: "",
    whatYoullDo: "",
    whatYoullBring: "",
    location: "",
    isActive: true,
  });

  useEffect(() => {
    if (isEdit && careers?.length > 0) {
      const job = careers.find((c) => c._id === id);
      if (job) {
        setFormData({
          title: job.title || "",
          aboutUs: job.aboutUs || "",
          theRole: job.theRole || "",
          whatYoullDo: job.whatYoullDo || "",
          whatYoullBring: job.whatYoullBring || "",
          location: job.location || "",
          isActive: job.isActive !== undefined ? job.isActive : true,
        });
      }
    }
  }, [isEdit, id, careers]);

  useEffect(() => {
    if (!isEdit) {
      dispatch(getAllCareersAdmin());
    }
  }, [dispatch, isEdit]);

  useEffect(() => {
    if (success) {
      toast.success(
        isEdit ? "Job updated successfully!" : "Job added successfully!"
      );
      dispatch(reset());
      navigate("/admin/careers");
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, dispatch, navigate, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.aboutUs ||
      !formData.theRole ||
      !formData.whatYoullDo ||
      !formData.whatYoullBring ||
      !formData.location
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (isEdit) {
      dispatch(updateCareer({ id, formData }));
    } else {
      dispatch(addCareer(formData));
    }
  };

  return (
    <Layout>
      <div className="add-edit-career-page">
        <div className="appointments-header d-flex justify-content-between align-items-start">
          <button
            onClick={() => navigate("/admin/careers")}
            className="back-btn d-flex row-reverse align-items-center"
          >
            <FiArrowLeft />
            Back to Jobs
          </button>
          <h2>{isEdit ? "Edit Job Posting" : "Add New Job Posting"}</h2>
        </div>

        <div className="career-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Job Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Medical Officer, Receptionist"
                required
              />
            </div>

            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., B-17 Islamabad / GT Rd, Sangjani, Islamabad"
                required
              />
            </div>

            <div className="form-group">
              <label>About Us / Department Info *</label>
              <textarea
                name="aboutUs"
                rows="6"
                value={formData.aboutUs}
                onChange={handleChange}
                placeholder="Describe the department, team, and work environment..."
                required
              />
            </div>

            <div className="form-group">
              <label>The Role *</label>
              <textarea
                name="theRole"
                rows="6"
                value={formData.theRole}
                onChange={handleChange}
                placeholder="Brief summary of the role and responsibilities..."
                required
              />
            </div>

            <div className="form-group">
              <label>What You'll Do *</label>
              <textarea
                name="whatYoullDo"
                rows="6"
                value={formData.whatYoullDo}
                onChange={handleChange}
                placeholder="• Prepare surgical trolleys with required instruments\n• Sterilize and arrange surgical equipment\n• Assist surgeons during procedures"
                required
              />
              <small className="form-hint">
                Use bullet points (•) for each responsibility
              </small>
            </div>

            <div className="form-group">
              <label>What You'll Bring *</label>
              <textarea
                name="whatYoullBring"
                rows="6"
                value={formData.whatYoullBring}
                onChange={handleChange}
                placeholder="• Minimum 3 years working experience\n• Diploma in relevant field\n• Knowledge of sterilization protocols"
                required
              />
              <small className="form-hint">
                Use bullet points (•) for each requirement
              </small>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                />
                <span>Active (visible on website)</span>
              </label>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate("/admin/careers")}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Saving..." : isEdit ? "Update Job" : "Add Job"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddEditCareer;
