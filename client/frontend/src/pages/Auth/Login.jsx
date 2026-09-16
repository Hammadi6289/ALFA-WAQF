import React, { useEffect, useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, success, user } = useSelector((state) => state.auth);

  // regex patterns
  const validateForm = () => {
    const newErrors = {};

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
      dispatch(login({ email, password }));
    } else {
      toast.error("Please fill both fields correctly.");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/doctors");
      return;
    }
    if (success) {
      //toast.success("Logged in successfully");
      setEmail("");
      setPassword("");
      navigate("/login");
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, navigate, dispatch]);

  return (
    <>
      <Helmet>
        <title>Sign In | Alfalah Hospital</title>
      </Helmet>

      <div className="auth-page">
        {/* ── Left panel ── */}
        <div className="auth-panel auth-panel--brand" aria-hidden="true">
          <div className="auth-brand-content">
            <div className="auth-brand-logo">
              <span>🏥</span>
            </div>
            <h2 className="auth-brand-title">Alfalah Hospital</h2>
            <p className="auth-brand-sub">
              Compassionate care for every patient, every day.
            </p>
            <ul className="auth-brand-features">
              <li>
                <span className="auth-feature-icon">✓</span>
                Book appointments online
              </li>
              <li>
                <span className="auth-feature-icon">✓</span>
                Access your medical history
              </li>
              <li>
                <span className="auth-feature-icon">✓</span>
                Track your appointments
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
              <div className="auth-form-icon">🔐</div>
              <h1 className="auth-form-title">Welcome back</h1>
              <p className="auth-form-sub">Sign in to your Alfalah account</p>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="auth-field">
                <label htmlFor="login-email" className="auth-label">
                  Email address
                </label>
                <div className={`auth-input-wrap ${errors.email ? "auth-input-wrap--error" : ""}`}>
                  <span className="auth-input-icon" aria-hidden="true">✉</span>
                  <input
                    id="login-email"
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
                <label htmlFor="login-password" className="auth-label">
                  Password
                </label>
                <div className={`auth-input-wrap ${errors.password ? "auth-input-wrap--error" : ""}`}>
                  <span className="auth-input-icon" aria-hidden="true">🔒</span>
                  <input
                    id="login-password"
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    className="auth-input"
                    autoComplete="current-password"
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
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={!email || !password}
              >
                Sign In
                <span className="auth-btn-arrow" aria-hidden="true">→</span>
              </button>
            </form>

            <p className="auth-switch">
              Don't have an account?{" "}
              <NavLink to="/register" className="auth-switch-link">
                Create one
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
