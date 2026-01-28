import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/actions/userActions";
import { Link } from "react-router";
import { FaEnvelope, FaPhone, FaBirthdayCake } from "react-icons/fa";
import "./AllUsers.css";

const AllUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.user);
  return (
    <Layout>
      <div className="allusers-page">
        <div className="allusers-header">
          <h2>Users Management</h2>
          <p>Manage your users and view detailed information</p>
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
              {users &&
                users.map((user, index) => (
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
