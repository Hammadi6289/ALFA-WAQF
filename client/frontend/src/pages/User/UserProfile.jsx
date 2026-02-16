import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import EditUserProfile from "./EditUserProfile";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slice/authSlice";
import { getLoginUserDetails } from "../../redux/actions/authActions";
import "./UserProfile.css";

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
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <h4 className="text-center"> Manage your Account</h4>
          <div className="col-md-3">
            <img
              className="card p-2"
              src={`data:image/jpeg;base64,${user?.image}`}
              alt="user pic"
              width={200}
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
            </div>
            <div className="button-container mt-5">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn button-tertiary"
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
