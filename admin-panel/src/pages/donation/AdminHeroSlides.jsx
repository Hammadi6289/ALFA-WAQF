import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllHeroSlides,
  deleteHeroSlide,
  getAllCampaigns,
} from "../../redux/actions/donationActions";
import { resetDonation } from "../../redux/slice/donationSlice";
import Layout from "../../components/Layout/Layout";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import "./DonationAdmin.css";

const AdminHeroSlides = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { heroSlides, campaigns, loading, success, error } = useSelector(
    (state) => state.donation
  );

  useEffect(() => {
    dispatch(getAllHeroSlides());
    dispatch(getAllCampaigns());
    dispatch(resetDonation());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Operation completed successfully");
      dispatch(getAllHeroSlides());
      dispatch(resetDonation());
    }
    if (error) {
      toast.error(error);
      dispatch(resetDonation());
    }
  }, [success, error, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this hero slide?")) {
      dispatch(deleteHeroSlide(id));
    }
  };

  const getCampaignTitle = (campaignId) => {
    const campaign = campaigns?.find((c) => c._id === campaignId);
    return campaign ? campaign.title : "Unknown";
  };

  return (
    <Layout>
      <div className="donation-admin-page">
        <div className="donation-admin-header">
          <div>
            <h2>Hero Slides</h2>
            <p>Manage donation page hero slider images</p>
          </div>
          <button
            className="add-btn"
            onClick={() => navigate("/admin/donation/hero-slides/add")}
          >
            <FiPlus />
            Add Hero Slide
          </button>
        </div>

        <div className="donation-table-wrapper">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : heroSlides?.length === 0 ? (
            <div className="empty-state">
              <p>No hero slides found. Click "Add Hero Slide" to create one.</p>
            </div>
          ) : (
            <table className="donation-admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Linked Campaign</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {heroSlides?.map((slide) => (
                  <tr key={slide._id}>
                    <td className="donation-image-cell">
                      <img
                        src={`data:image/jpeg;base64,${slide.image}`}
                        alt={slide.title}
                        className="donation-thumb"
                      />
                    </td>
                    <td className="donation-title-cell">{slide.title}</td>
                    <td>{getCampaignTitle(slide.campaignId)}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          slide.isActive ? "active" : "inactive"
                        }`}
                      >
                        {slide.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{slide.order}</td>
                    <td className="donation-action-buttons">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/donation/hero-slides/edit/${slide._id}`
                          )
                        }
                        className="action-btn edit-btn"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(slide._id)}
                        className="action-btn delete-btn"
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

export default AdminHeroSlides;
