import React, { useEffect, useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, success } = useSelector((state) => state.auth);

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
    if (success) {
      toast.success("Logged in successfully");
      setEmail("");
      setPassword("");
      navigate("/doctors");
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, navigate, dispatch]);

  return (
    <>
      <div className="auth-register-container">
        <div className="auth-register-card">
          <h2>Sign In</h2>
          <p>Please enter your email and password</p>

          <div className="form-group mb-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
              value={email}
              className={errors.email ? "error-border" : ""}
            />
          </div>

          <div className="form-group mb-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              value={password}
              className={errors.password ? "error-border" : ""}
            />
            {errors.password && (
              <div className="error-message">{errors.password}</div>
            )}
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn button-secondary"
            disabled={!email || !password}
          >
            Sign In
          </button>
          <p>
            Don't have an account?
            <NavLink to="/register"> Sign Up</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
