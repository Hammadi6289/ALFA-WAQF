import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addCampaign,
  updateCampaign,
  getAllCampaigns,
} from "../../redux/actions/donationActions";
import { resetDonation } from "../../redux/slice/donationSlice";
import Layout from "../../components/Layout/Layout";
import { FiArrowLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import "./DonationAdmin.css";

const AddEditCampaign = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { campaigns, loading, success, error } = useSelector(
    (state) => state.donation
  );
  const isEdit = !!id;

  const [priceOptionsInput, setPriceOptionsInput] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "medicines",
    image: null,
    buttonText: "Donate Now",
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    if (isEdit) {
      dispatch(getAllCampaigns());
    }
  }, [dispatch, isEdit]);

  useEffect(() => {
    if (success) {
      toast.success(isEdit ? "Campaign updated!" : "Campaign added!");
      dispatch(resetDonation());
      navigate("/admin/donation/campaigns");
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

    if (!formData.title || !formData.description) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!isEdit && !formData.image) {
      toast.error("Please select a campaign image");
      return;
    }

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("description", formData.description);
    submitData.append("type", formData.type);
    submitData.append("buttonText", formData.buttonText);
    submitData.append("priceOptions", JSON.stringify(formData.priceOptions));
    submitData.append("order", formData.order);
    submitData.append("isActive", formData.isActive);

    if (formData.image) {
      submitData.append("image", formData.image);
    }

    if (isEdit) {
      dispatch(updateCampaign({ id, formData: submitData }));
    } else {
      dispatch(addCampaign(submitData));
    }
  };

  // handle price options
  const handlePriceOptionsChange = (e) => {
    const value = e.target.value;
    setPriceOptionsInput(value);
    const prices = value
      .split(",")
      .map((p) => Number(p.trim()))
      .filter((p) => !isNaN(p) && p > 0);
    setFormData({ ...formData, priceOptions: prices });
  };

  // Add a new price option
  const addPriceOption = () => {
    const newPrice = prompt("Enter price amount in PKR (e.g. 500)");
    if (newPrice && !isNaN(Number(newPrice)) && Number(newPrice) > 0) {
      const updatedPrices = [...formData.priceOptions, Number(newPrice)];
      setFormData({ ...formData, priceOptions: updatedPrices });
      setPriceOptionsInput(updatedPrices.join(", "));
    }
  };

  // Remove a price option
  const removePriceOption = (indexToRemove) => {
    const updatedPrices = formData.priceOptions.filter(
      (_, index) => index !== indexToRemove
    );
    setFormData({ ...formData, priceOptions: updatedPrices });
    setPriceOptionsInput(updatedPrices.join(", "));
  };

  // useEffect to initialize priceOptionsInput when editing
  useEffect(() => {
    if (isEdit && campaigns?.length > 0) {
      const campaign = campaigns.find((c) => c._id === id);
      if (campaign) {
        setFormData({
          title: campaign.title,
          description: campaign.description,
          type: campaign.type,
          image: null,
          buttonText: campaign.buttonText || "Donate Now",
          priceOptions: campaign.priceOptions || [500, 1000, 5000],
          order: campaign.order || 0,
          isActive: campaign.isActive,
        });
        setPriceOptionsInput(
          (campaign.priceOptions || [500, 1000, 5000]).join(", ")
        );
      }
    }
  }, [isEdit, campaigns, id]);

  return (
    <Layout>
      <div className="donation-add-edit-page">
        <div className="donation-admin-header">
          <button
            onClick={() => navigate("/admin/donation/campaigns")}
            className="donations-back-btn"
          >
            <FiArrowLeft />
            Back to Campaigns
          </button>
          <h2>{isEdit ? "Edit Campaign" : "Add Campaign"}</h2>
        </div>

        <div className="donation-form-card">
          <form onSubmit={handleSubmit}>
            <div className="donation-form-group">
              <label>Campaign Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Help Deserving Patients with Medicines"
                required
              />
            </div>

            <div className="donation-form-group">
              <label>Description *</label>
              <textarea
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe how donations will help patients"
                required
              />
            </div>

            <div className="donation-form-row">
              <div className="donation-form-group">
                <label>Campaign Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="medicines">Medicines Help</option>
                  <option value="thalassemia">Thalassemia Support</option>
                  <option value="Hemophilia">Hemophilia Support</option>
                  <option value="Blood Disorders">Blood Disorders</option>
                </select>
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
              <label>Campaign Image *</label>
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
                onClick={() => navigate("/admin/donation/campaigns")}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading
                  ? "Saving..."
                  : isEdit
                  ? "Update Campaign"
                  : "Add Campaign"}
              </button>
            </div>

            <div className="donation-form-group">
              <label>Price Options (PKR)</label>
              <div className="price-options-wrapper">
                <div className="price-options-buttons">
                  {formData.priceOptions?.map((price, idx) => (
                    <div key={idx} className="price-option-item">
                      <span className="price-tag">PKR {price}</span>
                      <button
                        type="button"
                        className="remove-price-btn"
                        onClick={() => removePriceOption(idx)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="add-price-btn"
                    onClick={addPriceOption}
                  >
                    + Add Price
                  </button>
                </div>
                <small className="form-hint">
                  These amount buttons will appear on the donation page for
                  users to select
                </small>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default AddEditCampaign;
