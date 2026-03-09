import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { resetPassword } from "../../redux/actions/authActions";
import { logout, reset } from "../../redux/slice/authSlice";
import { FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";
import "./ResetPassword.css";
import { Helmet } from "react-helmet-async";

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    setIsSubmitting(true);
    dispatch(resetPassword({ id, oldPassword, newPassword, confirmPassword }));
    // dispatch(reset());
  };

  // Only handle response if button was clicked
  useEffect(() => {
    if (!isSubmitting) return;
    if (success) {
      toast.success("Password reset successfully");
      dispatch(logout());
      localStorage.removeItem("appData");
      dispatch(reset());
      navigate("/login");
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
      setIsSubmitting(false);
    }
  }, [error, success, isSubmitting]);

  return (
    <div className="reset-password-container">
      <Helmet>
        <title>Reset Account Password | Alfalah</title>
      </Helmet>
      {/* Background Decoration */}
      <div className="reset-bg-decoration"></div>

      {/* Back Button */}
      <button className="reset-back-btn" onClick={() => navigate(-1)}>
        <FiArrowLeft />
        <span>Back</span>
      </button>

      {/* Main Card */}
      <div className="reset-card">
        {/* Header with Icon */}
        <div className="reset-header">
          <div className="reset-icon-wrapper">
            <FiLock className="reset-icon" />
          </div>
          <h1 className="reset-title">Reset Password</h1>
          <p className="reset-subtitle">
            Choose a strong password you don't use elsewhere
          </p>
        </div>

        {/* Form */}
        <div className="reset-form">
          {/* Old Password */}
          <div className="reset-input-group">
            <label className="reset-label">Current Password</label>
            <div className="reset-input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showOldPassword ? "text" : "password"}
                className="reset-input"
                placeholder="Enter current password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowOldPassword(!showOldPassword)}
              >
                {showOldPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="reset-input-group">
            <label className="reset-label">New Password</label>
            <div className="reset-input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showNewPassword ? "text" : "password"}
                className="reset-input"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                {showNewPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {newPassword && newPassword.length < 6 && (
              <span className="password-hint error">
                Password must be at least 6 characters
              </span>
            )}
          </div>

          {/* Confirm Password */}
          <div className="reset-input-group">
            <label className="reset-label">Confirm New Password</label>
            <div className="reset-input-wrapper">
              <FiLock className="input-icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="reset-input"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {confirmPassword && newPassword !== confirmPassword && (
              <span className="password-hint error">
                Passwords do not match
              </span>
            )}
            {confirmPassword &&
              newPassword === confirmPassword &&
              newPassword.length >= 6 && (
                <span className="password-hint success">✓ Passwords match</span>
              )}
          </div>

          {/* Password Strength Indicator (Optional) 
          {newPassword && (
            <div className="password-strength">
              <div className="strength-label">Password strength:</div>
              <div className="strength-bars">
                <div
                  className={`strength-bar ${
                    newPassword.length >= 6 ? "active" : ""
                  }`}
                ></div>
                <div
                  className={`strength-bar ${
                    newPassword.length >= 8 ? "active" : ""
                  }`}
                ></div>
                <div
                  className={`strength-bar ${
                    /[A-Z]/.test(newPassword) ? "active" : ""
                  }`}
                ></div>
                <div
                  className={`strength-bar ${
                    /[0-9]/.test(newPassword) ? "active" : ""
                  }`}
                ></div>
                <div
                  className={`strength-bar ${
                    /[!@#$%^&*]/.test(newPassword) ? "active" : ""
                  }`}
                ></div>
              </div>
            </div>
          )}
          */}

          {/* Submit Button */}
          <button onClick={handleResetPassword} className="button-secondary ">
            Update Password
          </button>
        </div>

        {/* Footer Links */}
        <div className="reset-footer">
          <span>Remember your password?</span>
          <button className="login-link" onClick={() => navigate("/login")}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
