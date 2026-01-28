import React, { useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      toast.success("Logged in successfully");
      setEmail("");
      setPassword("");
      navigate("/profile");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

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
            />
          </div>

          <div className="form-group mb-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Make a password"
              value={password}
            />
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
