import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/userActions";
import { Link } from "react-router";
import { FaEnvelope, FaPhone, FaBirthdayCake } from "react-icons/fa";
import "./AllUsers.css";
import { FiSearch } from "react-icons/fi";

const AllUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.user);

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

        <div className="allusers-table-wrapper">
          <table className="allusers-table">
            <thead>
              <tr>
                <th>SN.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>DOB</th>
                <th>Status</th>
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
                      <span
                        className={`status-badge ${
                          user.status ? "active" : "inactive"
                        }`}
                      >
                        {user.isActive ? "Active" : "Inactive"}
                      </span>
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
      </div>
    </Layout>
  );
};

export default AllUsers;
