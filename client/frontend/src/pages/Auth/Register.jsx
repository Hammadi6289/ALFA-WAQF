import React, { useEffect, useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, success } = useSelector((state) => state.auth);

  // regex patterns
  const validateForm = () => {
    const newErrors = {};

    // Name validation: 2-50 characters, letters and spaces only
    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]{2,50}$/.test(name)) {
      newErrors.name = "Name must be 2-50 characters (letters and spaces only)";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation: min 6 chars
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(register({ name, email, password }));
    } else {
      toast.error("Please fill in all the required fields correctly.");
    }
  };

  useEffect(() => {
    if (success) {
      toast.success("Account created successfully");
      setName("");
      setEmail("");
      setPassword("");
      setErrors({});
      navigate("/login");
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, navigate, dispatch]);

  return (
    <>
      <Helmet>
        <title>Create Account | Alfalah Hospital</title>
      </Helmet>

      <div className="auth-page">
        {/* ── Left panel ── */}
        <div className="auth-panel auth-panel--brand" aria-hidden="true">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <span>🏥</span>
            </div>
            <h2 className="auth-brand-title">Join Alfalah</h2>
            <p className="auth-brand-sub">
              Create your account and take control of your healthcare journey.
            </p>
            <ul className="auth-brand-features">
              <li>
                <span className="auth-feature-icon">✓</span>
                Book specialist appointments
              </li>
              <li>
                <span className="auth-feature-icon">✓</span>
                View and manage your bookings
              </li>
              <li>
                <span className="auth-feature-icon">✓</span>
                Secure & confidential records
              </li>
            </ul>
          </div>
          <div className="auth-brand-circles" aria-hidden="true">
            <span className="auth-circle auth-circle--1" />
            <span className="auth-circle auth-circle--2" />
            <span className="auth-circle auth-circle--3" />
          </div>
        </div>

        {/* ── Right panel — form ── */}
        <div className="auth-panel auth-panel--form">
          <div className="auth-form-card">
            <div className="auth-form-header">
              <div className="auth-form-icon">👤</div>
              <h1 className="auth-form-title">Create an account</h1>
              <p className="auth-form-sub">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div className="auth-field">
                <label htmlFor="reg-name" className="auth-label">
                  Full name
                </label>
                <div className={`auth-input-wrap ${errors.name ? "auth-input-wrap--error" : ""}`}>
                  <span className="auth-input-icon" aria-hidden="true">👤</span>
                  <input
                    id="reg-name"
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Ali Hassan"
                    value={name}
                    className="auth-input"
                    autoComplete="name"
                  />
                </div>
                {errors.name && (
                  <span className="auth-error" role="alert">{errors.name}</span>
                )}
              </div>

              {/* Email */}
              <div className="auth-field">
                <label htmlFor="reg-email" className="auth-label">
                  Email address
                </label>
                <div className={`auth-input-wrap ${errors.email ? "auth-input-wrap--error" : ""}`}>
                  <span className="auth-input-icon" aria-hidden="true">✉</span>
                  <input
                    id="reg-email"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    className="auth-input"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <span className="auth-error" role="alert">{errors.email}</span>
                )}
              </div>

              {/* Password */}
              <div className="auth-field">
                <label htmlFor="reg-password" className="auth-label">
                  Password{" "}
                  <span className="auth-label-hint">(min. 6 characters)</span>
                </label>
                <div className={`auth-input-wrap ${errors.password ? "auth-input-wrap--error" : ""}`}>
                  <span className="auth-input-icon" aria-hidden="true">🔒</span>
                  <input
                    id="reg-password"
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={password}
                    className="auth-input"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁"}
                  </button>
                </div>
                {errors.password && (
                  <span className="auth-error" role="alert">{errors.password}</span>
                )}
                {/* Password strength bar */}
                {password.length > 0 && (
                  <div className="auth-strength-bar" aria-label="Password strength">
                    <div
                      className={`auth-strength-fill auth-strength-fill--${
                        password.length < 6
                          ? "weak"
                          : password.length < 10
                          ? "medium"
                          : "strong"
                      }`}
                    />
                    <span className="auth-strength-label">
                      {password.length < 6
                        ? "Weak"
                        : password.length < 10
                        ? "Medium"
                        : "Strong"}
                    </span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={!name || !email || !password}
              >
                Create Account
                <span className="auth-btn-arrow" aria-hidden="true">→</span>
              </button>
            </form>

            <p className="auth-switch">
              Already have an account?{" "}
              <NavLink to="/login" className="auth-switch-link">
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
