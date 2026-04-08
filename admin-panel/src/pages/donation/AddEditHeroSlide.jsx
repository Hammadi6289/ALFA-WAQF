import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addHeroSlide,
  updateHeroSlide,
  getAllHeroSlides,
  getAllCampaigns,
} from "../../redux/actions/donationActions";
import { resetDonation } from "../../redux/slice/donationSlice";
import Layout from "../../components/Layout/Layout";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import "./DonationAdmin.css";

const AddEditHeroSlide = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { heroSlides, campaigns, loading, success, error } = useSelector(
    (state) => state.donation
  );
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    campaignId: "",
    image: null,
    buttonText: "Donate Now",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    dispatch(getAllCampaigns());
    if (isEdit) {
      dispatch(getAllHeroSlides());
    }
  }, [dispatch, isEdit]);

  useEffect(() => {
    if (isEdit && heroSlides?.length > 0) {
      const slide = heroSlides.find((s) => s._id === id);
      if (slide) {
        setFormData({
          title: slide.title,
          subtitle: slide.subtitle || "",
          campaignId: slide.campaignId?._id || "",
          image: null,
          buttonText: slide.buttonText || "Donate Now",
          order: slide.order || 0,
          isActive: slide.isActive,
        });
      }
    }
  }, [isEdit, heroSlides, id]);

  useEffect(() => {
    if (success) {
      toast.success(isEdit ? "Hero slide updated!" : "Hero slide added!");
      dispatch(resetDonation());
      navigate("/admin/donation/hero-slides");
    }
    if (error) {
      toast.error(error);
      dispatch(resetDonation());
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

    if (!formData.title || !formData.campaignId) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!isEdit && !formData.image) {
      toast.error("Please select a hero image");
      return;
    }

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("subtitle", formData.subtitle);
    submitData.append("campaignId", formData.campaignId);
    submitData.append("buttonText", formData.buttonText);
    submitData.append("order", formData.order);
    submitData.append("isActive", formData.isActive);

    if (formData.image) {
      submitData.append("image", formData.image);
    }

    if (isEdit) {
      dispatch(updateHeroSlide({ id, formData: submitData }));
    } else {
      dispatch(addHeroSlide(submitData));
    }
  };

  return (
    <Layout>
      <div className="donation-add-edit-page">
        <div className="donation-admin-header">
          <button
            onClick={() => navigate("/admin/donation/hero-slides")}
            className="donations-back-btn"
          >
            <FiArrowLeft />
            Back to Hero Slides
          </button>
          <h2>{isEdit ? "Edit Hero Slide" : "Add Hero Slide"}</h2>
        </div>

        <div className="donation-form-card">
          <form onSubmit={handleSubmit}>
            <div className="donation-form-group">
              <label>Slide Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Help Save Lives"
                required
              />
            </div>

            <div className="donation-form-group">
              <label>Subtitle</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="Your donation makes a difference"
              />
            </div>

            <div className="donation-form-group">
              <label>Link to Campaign *</label>
              <select
                name="campaignId"
                value={formData.campaignId}
                onChange={handleChange}
                required
              >
                <option value="">Select a campaign</option>
                {campaigns?.map((campaign) => (
                  <option key={campaign._id} value={campaign._id}>
                    {campaign.title} (
                    {campaign.type.charAt(0).toUpperCase() +
                      campaign.type.slice(1)}
                    )
                  </option>
                ))}
              </select>
            </div>

            <div className="donation-form-row">
              <div className="donation-form-group">
                <label>Button Text</label>
                <input
                  type="text"
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleChange}
                  placeholder="Donate Now"
                />
              </div>
              <div className="donation-form-group">
                <label>Display Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="donation-form-group">
              <label>Hero Image *</label>
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

            <div className="donation-form-group donation-checkbox-group">
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

            <div className="donation-form-actions">
              <button
                type="button"
                onClick={() => navigate("/admin/donation/hero-slides")}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "Saving..." : isEdit ? "Update Slide" : "Add Slide"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddEditHeroSlide;
