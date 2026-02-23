import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetPassword } from "../../redux/actions/authActions";
import { logout, reset } from "../../redux/slice/authSlice";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error } = useSelector((state) => state.auth);
  // Reset state on mount
  useEffect(() => {
    dispatch(reset());
  }, []);
  const handleResetPassword = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error("Please fill all the fields");
    }
    dispatch(resetPassword(id, oldPassword, newPassword, confirmPassword));
    // dispatch(reset());
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
    if (success) {
      toast.success("Password reset successfully");
      dispatch(logout());
      localStorage.removeItem("appData");
      dispatch(reset());
      navigate("/login");
    }
  };

  useEffect(() => {}, [dispatch, error, success, navigate]);
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h1>Reset Your Password.</h1>

      <div className="mb-3">
        <label className="me-3" htmlFor="">
          Enter your Old Password
        </label>

        <input
          type="password"
          className="form-control"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="" className="me-3">
          Enter your new Password
        </label>

        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="" className="me-3">
          Confirm your new Password
        </label>

        <input
          type="password"
          className="form-control"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>

      <button onClick={handleResetPassword} className="btn button-secondary">
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
