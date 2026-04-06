import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getAllCampaigns,
  deleteCampaign,
} from "../../redux/actions/donationActions";
import { resetDonation } from "../../redux/slice/donationSlice";
import Layout from "../../components/Layout/Layout";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import "./DonationAdmin.css";

const AdminCampaigns = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { campaigns, loading, success, error } = useSelector(
    (state) => state.donation
  );

  useEffect(() => {
    dispatch(getAllCampaigns());
    dispatch(resetDonation());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Operation completed successfully");
      dispatch(getAllCampaigns());
      dispatch(resetDonation());
    }
    if (error) {
      toast.error(error);
      dispatch(resetDonation());
    }
  }, [success, error, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      dispatch(deleteCampaign(id));
    }
  };

  return (
    <Layout>
      <div className="donation-admin-page">
        <div className="donation-admin-header">
          <div>
            <h2>Donation Campaigns</h2>
            <p>Manage donation campaigns for needy patients</p>
          </div>
          <button
            className="add-btn"
            onClick={() => navigate("/admin/donation/campaigns/add")}
          >
            <FiPlus />
            Add Campaign
          </button>
        </div>

        <div className="donation-table-wrapper">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : campaigns?.length === 0 ? (
            <div className="empty-state">
              <p>
                No donation campaigns found. Click "Add Campaign" to create one.
              </p>
            </div>
          ) : (
            <table className="donation-admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns?.map((campaign) => (
                  <tr key={campaign._id}>
                    <td className="donation-image-cell">
                      <img
                        src={`data:image/jpeg;base64,${campaign.image}`}
                        alt={campaign.title}
                        className="donation-thumb"
                      />
                    </td>
                    <td className="donation-title-cell">{campaign.title}</td>
                    <td>
                      <span className="donation-type-badge">
                        {campaign.type === "medicines"
                          ? "Medicines Help"
                          : "Thalassemia Support"}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          campaign.isActive ? "active" : "inactive"
                        }`}
                      >
                        {campaign.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{campaign.order}</td>
                    <td className="donation-action-buttons">
                      <button
                        onClick={() =>
                          navigate(
                            `/admin/donation/campaigns/edit/${campaign._id}`
                          )
                        }
                        className="action-btn edit-btn"
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => handleDelete(campaign._id)}
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

export default AdminCampaigns;
