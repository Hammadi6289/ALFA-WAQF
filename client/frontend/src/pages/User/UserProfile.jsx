import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import EditUserProfile from "./EditUserProfile";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../redux/slice/authSlice";
import { getLoginUserDetails } from "../../redux/actions/authActions";
import "./UserProfile.css";
import { Helmet } from "react-helmet-async";
import { deleteSelfAccount } from "../../redux/actions/userActions";

const UserProfile = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    // dispatch(reset());
    const localData = localStorage.getItem("appData");
    const appData = JSON.parse(localData);
    if (appData) {
      const id = appData?.user?._id;
      dispatch(getLoginUserDetails(id));
    }
  }, [dispatch]);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("appData");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleDeleteAccount = async (userId) => {
    const confirm = window.confirm(
      "⚠️ WARNING: This will permanently delete your account and all associated data. This action CANNOT be undone. Are you absolutely sure?"
    );

    if (!confirm) return;

    // Double confirmation
    const doubleConfirm = window.confirm(
      "Final confirmation: Delete your account permanently?"
    );

    if (!doubleConfirm) return;

    try {
      await dispatch(deleteSelfAccount({ id: userId })).unwrap();
      dispatch(reset());

      toast.success("Account deleted successfully");

      // Clear local storage and redirect
      localStorage.removeItem("appData");
      navigate("/");
    } catch (error) {
      toast.error(error || "Failed to delete account");
    }
  };

  return (
    <>
      <Helmet>
        <title>My Profile | Alfalah</title>
      </Helmet>
      <div className="container mt-5">
        <div className="row">
          <h4 className="text-center"> Manage your Account</h4>
          <h6 className="text-center text-danger">
            {" "}
            Refresh the page If you encounter any Cache related issues.
          </h6>
          <div className="col-md-3 d-flex justify-content-center align-items-center mb-3">
            <img
              className="user-profile-img"
              src={`data:image/jpeg;base64,${user?.image}`}
              alt="user pic"
            />
          </div>
          <div className="col-md-8 mb-3">
            <div className="user-profile-data-container mb-3">
              <h4>{user?.name}</h4>
              <h6>
                <strong>Gender:</strong> {user?.gender || "-"}
              </h6>
              <h6>
                <strong>Date of Birth:</strong> {user?.dob || "-"}
              </h6>
              <h6>
                <strong>Email:</strong> {user?.email}
              </h6>
              <h6>
                <strong>Phone:</strong> {user?.phone || "-"}
              </h6>
              <h6>
                <strong>Address:</strong> {user?.address || "-"}
              </h6>
              <Link
                to={`/user/reset-password/${user?._id}`}
                className="reset-password-btn"
              >
                <i className="fa-solid fa-key"></i>
                Reset Password
              </Link>
            </div>
            <div className="button-container d-flex flex-column flex-lg-row mt-5 gap-3">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn button-tertiary ms-3"
              >
                <i className="fa-solid fa-pen-to-square"></i>
                Edit Profile
              </button>
              <button
                onClick={() => navigate("/user/appointments")}
                className="btn button-tertiary ms-3"
              >
                <i className="fa-solid fa-list"></i>
                My Appointments
              </button>
              <button
                onClick={handleLogout}
                className="btn button-secondary ms-3"
              >
                <i className="fa-solid fa-power-off"></i>
                Logout
              </button>
            </div>
          </div>
          <div className="danger-zone">
            <h3>⚠️ Danger Zone</h3>
            <p className="warning-text">
              Once you delete your account, there is no going back. This will
              permanently delete your profile, appointments, and all associated
              data.
            </p>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteAccount(user?._id)}
            >
              🗑️ Delete Account Permanently
            </button>
          </div>
        </div>
      </div>
      {/* Edit modal */}
      {isOpen && (
        <EditUserProfile isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default UserProfile;
