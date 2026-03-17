import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../redux/actions/userActions";
import { Link } from "react-router";
import { FaEnvelope, FaPhone, FaBirthdayCake } from "react-icons/fa";
import "./AllUsers.css";
import { FiSearch } from "react-icons/fi";
import { toast } from "react-hot-toast";

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState(null);

  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    setLoading(true);
    dispatch(getAllUsers()).finally(() => setLoading(false));
  }, [dispatch]);

  const handleDeleteUser = async (userId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    setActionType("delete");
    try {
      await dispatch(deleteUser({ id: userId })).unwrap();
      // Refetch users after successful deletion
      dispatch(getAllUsers());
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  // Filter logic
  const filteredUsers = users?.filter((user) => {
    const searchLower = searchTerm.toLowerCase();

    return (
      user.name?.toLowerCase().includes(searchLower) ||
      user.email?.toLowerCase().includes(searchLower) ||
      user.phone?.toLowerCase().includes(searchLower)
    );
  });
  return (
    <Layout>
      <div className="allusers-admin-page-page">
        <div className="allusers-header">
          <h2>Users Management</h2>
          <p>Manage your users and view detailed information</p>
        </div>

        {/* Search Bar */}
        <div className="search-filter-section">
          <div className="search-bar">
            <FiSearch className="search-icon" size={20} />

            <input
              type="text"
              placeholder="Search users..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
              >
                ✕
              </button>
            )}
          </div>
          <div className="search-results-count">
            {searchTerm && `${filteredUsers?.length || "No"} Users found`}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading doctors...</span>
            </div>
            <p className="mt-3">Loading doctors, please wait...</p>
          </div>
        ) : (
          <div className="allusers-table-wrapper">
            <table className="allusers-table">
              <thead>
                <tr>
                  <th>SN.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>DOB</th>
                  <th>Delete</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers &&
                  filteredUsers.map((user, index) => (
                    <tr key={user._id}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>
                        <FaEnvelope className="icon" /> {user.email}
                      </td>
                      <td>
                        <FaPhone className="icon" /> {user.phone || "N/A"}
                      </td>
                      <td>
                        <FaBirthdayCake className="icon" /> {user.dob || "N/A"}
                      </td>
                      <td>
                        <button
                          className="doctor-action-btn doctor-remove-btn"
                          onClick={() => handleDeleteUser(user?._id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <Link
                          className="details-link"
                          to={`/user-details/${user._id}`}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllUsers;
