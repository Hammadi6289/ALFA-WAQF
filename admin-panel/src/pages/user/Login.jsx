import React, { useEffect, useState } from "react";
import "./Login.css";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { reset } from "../../redux/slice/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleLogin = () => {
  //   if (!email || !password) return toast.error("Please fill all the fields");
  //   dispatch(login({ email, password }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (!email || !password) return toast.error("Please fill all the fields");
    dispatch(login({ email, password }));
  };

  const { success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      toast.success("Logged in successfully");
      navigate("/dashboard");
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [success, error, navigate, dispatch]);
  return (
    <>
      <div className="admin-login-wrapper">
        <div className="admin-login-card">
          <h1 className="admin-login-title">Admin Login</h1>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={email}
                autoComplete="email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="btn button-secondary w-100"
              // onClick={handleLogin}
            >
              Login
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link
              className="admin-panel-login-link"
              to="https://mail.google.com/mail/?view=cm&to=Hammad6289@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span style={{ color: "#6b7280", fontWeight: 400 }}>
                Trouble logging in or new user?
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  color: "#4f46e5",
                  fontWeight: 600,
                  fontSize: "14px",
                }}
              >
                {/* Mail icon */}
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                Hammad6289@gmail.com
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
