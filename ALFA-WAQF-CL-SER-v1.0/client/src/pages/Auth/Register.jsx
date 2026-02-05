import React, { useEffect, useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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
      <div className="auth-register-container">
        <div className="auth-register-card">
          <h2>Create an Account</h2>
          <p>Please enter your details to register</p>
          <div className="form-group mb-3">
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
              value={name}
              className={errors.name ? "error-border" : ""}
            />
          </div>

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
              placeholder="Make a password (min 6 characters)"
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
            disabled={!name || !email || !password}
          >
            Register
          </button>
          <p>
            Already have an account?
            <NavLink to="/login">Login here</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
