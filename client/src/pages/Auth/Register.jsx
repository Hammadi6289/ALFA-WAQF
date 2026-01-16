import React, { useState } from "react";
import "./Auth.css";
import { NavLink, useNavigate } from "react-router";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      toast.success("Account created successfully");
      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

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
            />
          </div>

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
